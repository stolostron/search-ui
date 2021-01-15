import React, { Fragment } from 'react'
import {
    AcmAlert,
    AcmChartGroup,
    AcmDonutChart,
    AcmLoadingPage,
    AcmPage,
    AcmPageHeader,
    AcmOverviewProviders,
    AcmSummaryList,
    Provider,
    AcmButton,
    AcmActionGroup,
    AcmLaunchLink,
    AcmAutoRefreshSelect,
    AcmRefreshTime,
} from '@open-cluster-management/ui-components'
import { ButtonVariant, PageSection } from '@patternfly/react-core'
import { PlusIcon } from '@patternfly/react-icons'
import { consoleClient } from '../../console-sdk/console-client'
import { useGetOverviewQuery, useGetResourceQuery } from '../../console-sdk/console-sdk'
import { useSearchResultCountQuery } from '../../search-sdk/search-sdk'
import { searchClient } from '../../search-sdk/search-client'
import { ClusterManagementAddOn } from '../../lib/resource-request'

// TODO: Need to verify correct spelling for all these labels.
export function mapProviderFromLabel(provider: string): Provider {
    switch (provider) {
        case 'Amazon':
            return Provider.aws
        case 'Azure':
            return Provider.azure
        case 'Baremetal':
            return Provider.baremetal
        case 'Google':
            return Provider.gcp
        case 'IBM':
            return Provider.ibm
        case 'RedHat':
            return Provider.redhatcloud
        case 'VMware':
            return Provider.vmware
        default:
            return Provider.other
    }
}

function getClusterSummary(clusters: any) {
    const clusterSummary = clusters.reduce(
        (prev: any, curr: any, index: number) => {
            // Data for Providers section.
            const cloud = curr.metadata?.labels?.cloud || 'other'
            const provider = prev.providers.find((p: any) => p.provider === mapProviderFromLabel(cloud))
            if (provider) {
                provider.clusterCount = provider.clusterCount + 1
            } else {
                prev.providers.push({
                    provider: mapProviderFromLabel(cloud),
                    clusterCount: 1,
                    onClick: () => {
                        console.log(`Execute action for provider: ${cloud}`)
                    },
                }) // TODO: Implement this action.
            }

            // Data for Summary section.
            prev.kubernetesTypes.add(curr.metadata.labels.vendor)
            prev.regions.add(curr.metadata.labels.region)

            // Data for Cluster status pie chart.
            if (curr.status === 'ok') {
                prev.ready = prev.ready + 1
            } else {
                prev.offline = prev.offline + 1
            }
            return prev
        },
        { kubernetesTypes: new Set(), regions: new Set(), ready: 0, offline: 0, providerCounts: {}, providers: [] }
    )

    return clusterSummary
}

const searchInput = [
    { keywords: [], filters: [{ property: 'kind', values: ['node'] }] },
    { keywords: [], filters: [{ property: 'kind', values: ['pod'] }] },
    {
        keywords: [],
        filters: [
            { property: 'kind', values: ['pod'] },
            { property: 'status', values: ['Running', 'Completed'] },
        ],
    },
    {
        keywords: [],
        filters: [
            { property: 'kind', values: ['pod'] },
            { property: 'status', values: ['Pending', 'ContainerCreating', 'Waiting', 'Terminating'] },
        ],
    },
    {
        keywords: [],
        filters: [
            { property: 'kind', values: ['pod'] },
            {
                property: 'status',
                values: ['Failed', 'CrashLoopBackOff', 'ImagePullBackOff', 'Terminated', 'OOMKilled', 'Unknown'],
            },
        ],
    },
    {
        keywords: [],
        filters: [
            { property: 'apigroup', values: ['policy.open-cluster-management.io'] },
            { property: 'kind', values: ['policy'] },
            { property: 'compliant', values: ['Compliant'] },
        ],
    },
    {
        keywords: [],
        filters: [
            { property: 'apigroup', values: ['policy.open-cluster-management.io'] },
            { property: 'kind', values: ['policy'] },
            { property: 'compliant', values: ['NonCompliant'] },
        ],
    },
]

const PageActions = (props: { timestamp: string; reloading: boolean; refetch: () => void }) => {
    const { data, loading, error } = useGetResourceQuery({
        client: consoleClient,
        variables: {
            selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons',
            namespace: 'open-cluster-management',
            name: null,
            cluster: 'local-cluster',
            kind: null,
        },
    })
    if (loading) {
        console.log('loading')
    } else if (error) {
        console.log(error)
    }
    const addons = data?.getResource.items

    function getLaunchLink(addons: ClusterManagementAddOn[]) {
        const pathKey = 'console.open-cluster-management.io/launch-link'
        const textKey = 'console.open-cluster-management.io/launch-link-text'
        if (addons && addons.filter((addon) => addon.metadata.name === 'observability-controller')) {
            return addons
                ?.filter((addon) => addon.metadata.name === 'observability-controller')
                ?.map((addon) => ({
                    id: addon.metadata.annotations![textKey] ?? '',
                    text: addon.metadata.annotations![textKey] ?? '',
                    href: addon.metadata.annotations![pathKey] ?? '',
                }))
        } else {
            return undefined
        }
    }

    return (
        <Fragment>
            <AcmActionGroup>
                <AcmLaunchLink links={getLaunchLink(addons)} />
                <AcmButton
                    href="/console/add-connection"
                    variant={ButtonVariant.link}
                    component="a"
                    rel="noreferrer"
                    id="add-cloud-connection"
                    icon={<PlusIcon />}
                    iconPosition="left"
                >
                    Add cloud connection
                </AcmButton>
                <AcmAutoRefreshSelect refetch={props.refetch} refreshIntervals={[30, 60, 5 * 60, 30 * 60, 0]} />
            </AcmActionGroup>
            <AcmRefreshTime timestamp={props.timestamp} reloading={props.reloading} />
        </Fragment>
    )
}

export default function OverviewPage() {
    const { data, loading, error, refetch } = useGetOverviewQuery({
        client: process.env.NODE_ENV === 'test' ? undefined : consoleClient,
    })
    const timestamp = data?.overview?.timestamp as string
    const { data: searchData, loading: searchLoading, error: searchError } = useSearchResultCountQuery({
        client: process.env.NODE_ENV === 'test' ? undefined : searchClient,
        variables: { input: searchInput },
    })
    const searchResult = searchData?.searchResult || []
    const { kubernetesTypes, regions, ready, offline, providers } = getClusterSummary(data?.overview?.clusters || [])

    const summary =
        loading || searchLoading
            ? []
            : [
                  {
                      isPrimary: false,
                      description: 'Applications',
                      count: data?.overview?.applications?.length || 0,
                      href: 'search?filters={"textsearch":"kind%3Aapplication"}',
                  },
                  {
                      isPrimary: false,
                      description: 'Clusters',
                      count: data?.overview?.clusters?.length || 0,
                      href: 'search?filters={"textsearch":"kind%3Acluster"}',
                  },
                  { isPrimary: false, description: 'Kubernetes type', count: kubernetesTypes.size },
                  { isPrimary: false, description: 'Region', count: regions.size },
                  {
                      isPrimary: false,
                      description: 'Nodes',
                      count: searchResult[0]?.count || 0,
                      href: '/search?filters={"textsearch":"kind%3Anode"}',
                  },
                  {
                      isPrimary: false,
                      description: 'Pods',
                      count: searchResult[1]?.count || 0,
                      href: '/search?filters={"textsearch":"kind%3Apod"}',
                  },
              ]

    const podData =
        loading || searchLoading
            ? []
            : [
                  { key: 'Running', value: searchResult[2]?.count || 0, isPrimary: true },
                  { key: 'Pending', value: searchResult[3]?.count || 0 },
                  { key: 'Failed', value: searchResult[4]?.count || 0, isDanger: true },
              ]

    const complianceData =
        loading || searchLoading
            ? []
            : [
                  { key: 'Compliant', value: searchResult[5]?.count || 0, isPrimary: true },
                  { key: 'Non-compliant', value: searchResult[6]?.count || 0, isDanger: true },
              ]

    const clusterData =
        loading || searchLoading
            ? []
            : [
                  { key: 'Ready', value: ready, isPrimary: true },
                  { key: 'Offline', value: offline, isDanger: true },
              ]

    if (error || searchError) {
        return (
            <AcmPage>
                <AcmPageHeader
                    title="Overview"
                    actions={<PageActions timestamp={timestamp} reloading={loading} refetch={useGetOverviewQuery} />}
                />
                <PageSection>
                    <AcmAlert
                        noClose
                        isInline
                        variant={'danger'}
                        title="An unexpected error occurred. Try again."
                        subtitle="The backend service is unavailable."
                    />
                </PageSection>
            </AcmPage>
        )
    }

    return (
        <AcmPage>
            <AcmPageHeader
                title="Overview"
                actions={<PageActions timestamp={timestamp} reloading={loading} refetch={refetch} />}
            />

            {loading || searchLoading ? (
                <AcmLoadingPage />
            ) : (
                <PageSection>
                    <AcmOverviewProviders providers={providers} />
                </PageSection>
            )}

            <PageSection>
                {loading || searchLoading ? (
                    <AcmSummaryList key="loading" loading title="Summary" list={summary} />
                ) : (
                    <AcmSummaryList title="Summary" list={summary} />
                )}
            </PageSection>

            <PageSection>
                {loading || searchLoading ? (
                    <AcmChartGroup>
                        <AcmDonutChart
                            loading
                            key="chart-loading-1"
                            title="Cluster compliance"
                            description="Overview of policy compliance status"
                            data={[]}
                        />
                        <AcmDonutChart
                            loading
                            key="chart-loading-2"
                            title="Pods"
                            description="Overview of pod count and status"
                            data={[]}
                        />
                        <AcmDonutChart
                            loading
                            key="chart-loading-3"
                            title="Cluster status"
                            description="Overview of cluster status"
                            data={[]}
                        />
                    </AcmChartGroup>
                ) : (
                    <AcmChartGroup>
                        <AcmDonutChart
                            title="Cluster compliance"
                            description="Overview of policy compliance status"
                            data={complianceData}
                        />
                        <AcmDonutChart title="Pods" description="Overview of pod count and status" data={podData} />
                        <AcmDonutChart
                            title="Cluster status"
                            description="Overview of cluster status"
                            data={clusterData}
                        />
                    </AcmChartGroup>
                )}
            </PageSection>
        </AcmPage>
    )
}
