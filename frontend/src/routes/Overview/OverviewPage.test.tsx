import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { GraphQLError } from 'graphql'
import { wait } from '../../lib/test-helper'
import OverviewPage, { mapProviderFromLabel } from './OverviewPage'
import { GetOverviewDocument } from '../../console-sdk/console-sdk'
import { SearchResultCountDocument } from '../../search-sdk/search-sdk'

it('should responsed with correct value for mapProviderFromLabel function', () => {
    expect(mapProviderFromLabel('Amazon')).toEqual('aws')
    expect(mapProviderFromLabel('Azure')).toEqual('azure')
    expect(mapProviderFromLabel('Baremetal')).toEqual('baremetal')
    expect(mapProviderFromLabel('Google')).toEqual('gcp')
    expect(mapProviderFromLabel('IBM')).toEqual('ibm')
    expect(mapProviderFromLabel('RedHat')).toEqual('redhatcloud')
    expect(mapProviderFromLabel('VMware')).toEqual('vmware')
    expect(mapProviderFromLabel('other')).toEqual('other')
})

it('should render overview page in loading state', async () => {
    render(
        <Router history={createBrowserHistory()}>
            <MockedProvider mocks={[]}>
                <OverviewPage />
            </MockedProvider>
        </Router>
    )
    // Test the loading state while apollo query finishes
    expect(screen.getByText('Loading')).toBeInTheDocument()
})

it('should render overview page in error state', async () => {
    const mocks = [
        {
            request: {
                query: GetOverviewDocument,
            },
            result: {
                errors: [new GraphQLError('Error getting overview data')],
            },
        },
    ]

    render(
        <Router history={createBrowserHistory()}>
            <MockedProvider mocks={mocks}>
                <OverviewPage />
            </MockedProvider>
        </Router>
    )
    // Test the loading state while apollo query finishes
    expect(screen.getByText('Loading')).toBeInTheDocument()
    // This wait pauses till apollo query is returning data
    await wait()
    // Test that the component has rendered correctly with an error
    await waitFor(() => expect(screen.queryByText('overview.data.error.title')).toBeTruthy())
})

it('should render overview page with expected data', async () => {
    const mocks = [
        {
            request: {
                query: GetOverviewDocument,
            },
            result: {
                data: {
                    overview: {
                        clusters: [
                            {
                                metadata: {
                                    name: 'local-cluster',
                                    namespace: 'local-cluster',
                                    labels: {
                                        cloud: 'Amazon',
                                        clusterID: '0423d368-1f67-4300-bd26-05955bbbbf58',
                                        'installer.name': 'multiclusterhub',
                                        'installer.namespace': 'open-cluster-management',
                                        'local-cluster': 'true',
                                        name: 'local-cluster',
                                        vendor: 'OpenShift',
                                        region: 'Other',
                                        environment: 'Other',
                                    },
                                    uid: null,
                                    __typename: 'Metadata',
                                },
                                consoleURL:
                                    'https://console-openshift-console.apps.zlayne-dev.dev07.red-chesterfield.com',
                                status: 'ok',
                                __typename: 'ClusterOverview',
                            },
                        ],
                        applications: [
                            {
                                metadata: {
                                    name: 'nginx-app-3',
                                    namespace: null,
                                    __typename: 'Metadata',
                                },
                                raw: null,
                                selector: null,
                                __typename: 'ApplicationOverview',
                            },
                        ],
                        compliances: [
                            {
                                raw: {
                                    status: {
                                        status: [
                                            {
                                                clustername: 'local-cluster',
                                                clusternamespace: 'local-cluster',
                                                compliant: "Compliant",
                                            }
                                        ]
                                    }
                                }
                            }
                        ],
                        timestamp: 'Wed Jan 13 2021 13:19:40 GMT+0000 (Coordinated Universal Time)',
                        __typename: 'Overview',
                    },
                },
            },
        },
        {
            request: {
                query: SearchResultCountDocument,
                variables: {
                    input: [
                        {
                            keywords: [],
                            filters: [
                                {
                                    property: 'kind',
                                    values: ['node'],
                                },
                            ],
                        },
                        {
                            keywords: [],
                            filters: [
                                {
                                    property: 'kind',
                                    values: ['pod'],
                                },
                            ],
                        },
                        {
                            keywords: [],
                            filters: [
                                {
                                    property: 'kind',
                                    values: ['pod'],
                                },
                                {
                                    property: 'status',
                                    values: ['Running', 'Completed'],
                                },
                            ],
                        },
                        {
                            keywords: [],
                            filters: [
                                {
                                    property: 'kind',
                                    values: ['pod'],
                                },
                                {
                                    property: 'status',
                                    values: ['Pending', 'ContainerCreating', 'Waiting', 'Terminating'],
                                },
                            ],
                        },
                        {
                            keywords: [],
                            filters: [
                                {
                                    property: 'kind',
                                    values: ['pod'],
                                },
                                {
                                    property: 'status',
                                    values: [
                                        'Failed',
                                        'CrashLoopBackOff',
                                        'ImagePullBackOff',
                                        'Terminated',
                                        'OOMKilled',
                                        'Unknown',
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
            result: {
                data: {
                    searchResult: [
                        {
                            count: 6,
                            __typename: 'SearchResult',
                        },
                        {
                            count: 335,
                            __typename: 'SearchResult',
                        },
                        {
                            count: 335,
                            __typename: 'SearchResult',
                        },
                        {
                            count: 0,
                            __typename: 'SearchResult',
                        },
                        {
                            count: 0,
                            __typename: 'SearchResult',
                        },
                    ],
                },
            },
        },
    ]

    render(
        <Router history={createBrowserHistory()}>
            <MockedProvider mocks={mocks}>
                <OverviewPage />
            </MockedProvider>
        </Router>
    )
    // Test the loading state while apollo query finishes
    expect(screen.getByText('Loading')).toBeInTheDocument()
    // This wait pauses till apollo query is returning data
    await wait()
    // Test that the component has rendered correctly with an error
    await waitFor(() => expect(screen.queryByText('Amazon')).toBeTruthy())
})
