import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { wait } from '../../../../lib/test-helper'
import { DeleteResourceModal } from './DeleteResourceModal'
import { DeleteResourceDocument, UserAccessDocument } from '../../../../console-sdk/console-sdk'
import { SearchResultItemsDocument } from '../../../../search-sdk/search-sdk'

describe('DeleteResourceModal', () => {
    it('should call the delete resource mutation with a successful response', async () => {
        const mocks = [
            {
                request: {
                    query: UserAccessDocument,
                    variables: {
                        resource: 'pod',
                        action: 'delete',
                        namespace: 'testNamespace',
                        name: 'testPod',
                        apiGroup: 'v1',
                    },
                },
                result: {
                    data: {
                        userAccess: {
                            allowed: true,
                            reason: 'RBAC: allowed by ...',
                            namespace: 'testNamespace',
                            verb: 'delete',
                            group: 'v1',
                            version: '*',
                            resource: 'pod',
                            name: 'testPod',
                        },
                    },
                },
            },
            {
                request: {
                    query: DeleteResourceDocument,
                    variables: {
                        apiVersion: 'v1',
                        name: 'testPod',
                        namespace: 'testNamespace',
                        cluster: 'testCluster',
                        kind: 'pod',
                    },
                },
                result: {
                    data: {
                        deleteResource: {
                            apiVersion: 'v1',
                            kind: 'pod',
                            metadata: {
                                name: 'testPod',
                                namespace: 'testNamespace',
                            },
                        },
                    },
                },
            },
            {
                request: {
                    query: SearchResultItemsDocument,
                    variables: {
                        input: [
                            {
                                keywords: [],
                                filters: [
                                    {
                                        property: 'kind',
                                        values: ['pod'],
                                    },
                                ],
                            },
                        ],
                    },
                    fetchPolicy: 'cache-first',
                },
                result: {
                    data: {
                        searchResult: [
                            {
                                items: [
                                    {
                                        apiversion: 'v1',
                                        cluster: 'testCluster',
                                        container: 'installer',
                                        created: '2021-01-04T14:53:52Z',
                                        hostIP: '10.0.128.203',
                                        kind: 'pod',
                                        name: 'testPod',
                                        namespace: 'testNamespace',
                                        podIP: '10.129.0.40',
                                        restarts: 0,
                                        startedAt: '2021-01-04T14:53:52Z',
                                        status: 'Completed',
                                        _uid: 'testing-search-results-pod',
                                    },
                                ],
                                __typename: 'SearchResult',
                            },
                        ],
                    },
                },
            },
        ]
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <DeleteResourceModal
                    open={true}
                    currentQuery={'kind:pod'}
                    resource={{
                        name: 'testPod',
                        namespace: 'testNamespace',
                        kind: 'pod',
                        apiversion: 'v1',
                        cluster: 'testCluster',
                    }}
                    close={() => {}}
                />
            </MockedProvider>
        )

        // wait for userAccess query to finish
        await wait()

        // find the button and simulate a click
        const submitButton = screen.getByText('search.modal.delete.resource.action.delete')
        expect(submitButton).toBeTruthy()
        userEvent.click(submitButton)

        await wait() // Test that the component has rendered correctly with an error
        await waitFor(() => expect(screen.queryByTestId('delete-resource-error')).not.toBeInTheDocument())
    })
})
