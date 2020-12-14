import React from 'react';
import { AcmChartGroup,
    AcmDonutChart,
    AcmLoadingPage,
    AcmPage,
    AcmPageHeader,
    AcmOverviewProviders,
    AcmSummaryList,
    Provider,
} from '@open-cluster-management/ui-components'
import { consoleClient } from '../../console-sdk/console-client'
import { useGetOverviewQuery } from '../../console-sdk/console-sdk'

// TODO: Need to verify correct spelling for all these labels.
function mapProviderFromLabel(provider: string): Provider {
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
function getProvidersData(clusters: any){
    // TODO: A reducer is better here.
    const providers: any = {}
    clusters.forEach((cluster: { metadata: { labels: { cloud: any; }; }; }) => {
        const cloud = cluster.metadata?.labels?.cloud || 'other'
        providers[cloud] = providers[cloud] ? providers[cloud] + 1 : 1
    })

    return Object.keys(providers).map((key: string) => (
        { provider: mapProviderFromLabel(key),
            clusterCount: providers[key],
            onClick: ()=>{console.log(`clicked cluster ${key}`)}}
    ))
}


export default function OverviewPage() {
    const { data, loading, error } = useGetOverviewQuery({client: consoleClient})
    if (loading){
        return (
            <AcmPage>
                <AcmPageHeader title="Overview" />
                
                {/* TODO: Use material-ui styles instead of inline. */}
                <div style={{ marginLeft: "1rem" }}>
                    <AcmLoadingPage />
                </div>
                <div style={{ margin: "1rem 1rem 1rem 2rem" }}>
                    <AcmSummaryList key="summary-list-loading" loading title="Summary" list={[]}/>
                </div>

                <div style={{ margin: "1rem 1rem 1rem 2rem" }}>
                    <AcmChartGroup>
                        <AcmDonutChart loading key="chart-loading-1" title="Cluster compliance" description="Overview of policy compliance status" data={[]} />
                        <AcmDonutChart loading key="chart-loading-2" title="Pods" description="Overview of pod count and status" data={[]} />
                        <AcmDonutChart loading key="chart-loading-3" title="Cluster status" description="Overview of cluster status" data={[]} />
                    </AcmChartGroup>
                </div>
            </AcmPage>    
            )
    }

    if (error){
        // TODO: need better error message.
        return (<p>Error getting data.</p>)
    }

    const providers = getProvidersData(data?.overview?.clusters || [])

    // TODO: Get data from API.
    // TODO: Fix links.
    const summary = [
        { isPrimary: true, description: 'Applications', count: data?.overview?.applications?.length || 0, href: '/search?query=apps' },
        { isPrimary: false, description: 'Clusters', count: data?.overview?.clusters?.length || 0, href: '/search?query=clusters' },
        { isPrimary: false, description: 'Kubernetes type', count: 99, href: '/search' },
        { isPrimary: false, description: 'Region', count: 99, href: '/search' },
        { isPrimary: false, description: 'Nodes', count: 99, href: '/search?query=nodes' },
        { isPrimary: false, description: 'Pods', count: 99, href: '/search?query=pods' },
    ]

    // TODO: Get data from API.
    const complianceData = [
        { key: 'Compliant', value: 99, isPrimary: true },
        { key: 'Non-compliant', value: 99, isDanger: true },
    ]

    // TODO: Get data from API.
    const podData = [
        { key: 'Running', value: 99, isPrimary: true },
        { key: 'Pending', value: 99 },
        { key: 'Failed', value: 99, isDanger: true },
    ]

    // TODO: Get data from API.
    const clusterData = [
        { key: 'Ready', value: 99, isPrimary: true },
        { key: 'Offline', value: 99, isDanger: true },
    ]

    return (
        <AcmPage>  
            <AcmPageHeader title="Overivew" />

            {/* TODO: Use material-ui styles instead of inline. */}
            <div style={{ margin: "2rem 1rem 1rem 2rem" }}>
                <AcmOverviewProviders providers={providers} />
            </div>
                      
            <div style={{ margin: "1rem 2rem 1rem 2rem" }}>
                <AcmSummaryList title="Summary" list={summary}/>
            </div>
        

            <div style={{ margin: "1rem 1rem 1rem 2rem" }}>
                <AcmChartGroup>
                    <AcmDonutChart title="Cluster compliance" description="Overview of policy compliance status" data={complianceData} />
                    <AcmDonutChart title="Pods" description="Overview of pod count and status" data={podData} />
                    <AcmDonutChart title="Cluster status" description="Overview of cluster status" data={clusterData} />
                </AcmChartGroup>
            </div>
        </AcmPage>
    )
}
