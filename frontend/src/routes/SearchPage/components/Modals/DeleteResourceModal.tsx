import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmAlert, AcmModal, AcmButton } from '@open-cluster-management/ui-components'
import {
    SearchResultItemsDocument,
    SearchResultRelatedCountDocument,
    SearchResultRelatedItemsDocument,
} from '../../../../search-sdk/search-sdk'
import { searchClient } from '../../../../search-sdk/search-client'
import { useUserAccessQuery, useDeleteResourceMutation } from '../../../../console-sdk/console-sdk'
import { consoleClient } from '../../../../console-sdk/console-client'
import { convertStringToQuery } from '../../search-helper'

export interface IDeleteModalProps {
    open: boolean
    close: () => void
    resource: any
    currentQuery: string
    relatedResource: boolean
}

export const ClosedDeleteModalProps: IDeleteModalProps = {
    open: false,
    close: () => {},
    resource: undefined,
    currentQuery: '',
    relatedResource: false,
}

export const DeleteResourceModal = (props: any) => {
    const { open, close, resource, currentQuery, relatedResource } = props
    const [deleteResourceMutation, deleteResourceResults] = useDeleteResourceMutation({ client: consoleClient })
    let apiGroup = ''
    if (resource) {
        const kind = resource.selfLink.split('/')
        apiGroup = kind[1] === 'apis' ? kind[2] : ''
    }
    const userAccessResponse = useUserAccessQuery({
        skip: !resource,
        client: consoleClient,
        variables: {
            resource: resource?.kind,
            action: 'delete',
            namespace: resource?.namespace,
            name: resource?.name,
            apiGroup,
        },
    })

    function deleteResourceFn() {
        deleteResourceMutation({
            variables: {
                selfLink: resource.selfLink,
                name: resource.name,
                namespace: resource.namespace,
                cluster: resource.cluster,
                kind: resource.kind,
                // childResources: // TODO look how app team is getting the correct child resources
            },
            update: (cache, { data }) => {
                if (relatedResource) {
                    // if related resource is being removed the table & related card count need to be updated
                    const relatedItemsResult = searchClient.readQuery({
                        query: SearchResultRelatedItemsDocument,
                        variables: {
                            input: [
                                {
                                    ...convertStringToQuery(currentQuery),
                                    relatedKinds: [resource.kind],
                                },
                            ],
                        },
                    })
                    if (relatedItemsResult && relatedItemsResult.searchResult) {
                        searchClient.writeQuery({
                            query: SearchResultRelatedItemsDocument,
                            variables: {
                                input: [
                                    {
                                        ...convertStringToQuery(currentQuery),
                                        relatedKinds: [resource.kind],
                                    },
                                ],
                            },
                            data: {
                                searchResult: [
                                    {
                                        __typename: 'SearchResult',
                                        related: relatedItemsResult.searchResult[0].related.map((item: any) => {
                                            if (item.kind === resource.kind) {
                                                return {
                                                    items: item.items.filter((i: any) => {
                                                        return (
                                                            i.cluster !== resource.cluster ||
                                                            i.namespace !== resource.namespace ||
                                                            i.kind !== resource.kind ||
                                                            i.name !== resource.name
                                                        )
                                                    }),
                                                    kind: item.kind,
                                                }
                                            }
                                            return item
                                        }),
                                    },
                                ],
                            },
                        })
                    }
                    const relatedCountResult = searchClient.readQuery({
                        query: SearchResultRelatedCountDocument,
                        variables: {
                            input: [convertStringToQuery(currentQuery)],
                        },
                    })
                    if (relatedCountResult && relatedCountResult.searchResult) {
                        searchClient.writeQuery({
                            query: SearchResultRelatedCountDocument,
                            variables: {
                                input: [convertStringToQuery(currentQuery)],
                            },
                            data: {
                                searchResult: [
                                    {
                                        __typename: 'SearchResult',
                                        related: relatedCountResult.searchResult[0].related.map((item: any) => {
                                            if (item.kind === resource.kind) {
                                                item.count = item.count - 1
                                                return item
                                            }
                                            return item
                                        }),
                                    },
                                ],
                            },
                        })
                    }
                    close()
                } else {
                    // Get current search query results
                    const currentSearchResults = searchClient.readQuery({
                        query: SearchResultItemsDocument,
                        variables: {
                            input: [convertStringToQuery(currentQuery)],
                        },
                    })
                    if (currentSearchResults && currentSearchResults.searchResult) {
                        // Remove deleted resource from search query results - this removes the resource from UI
                        searchClient.writeQuery({
                            query: SearchResultItemsDocument,
                            variables: {
                                input: [convertStringToQuery(currentQuery)],
                            },
                            data: {
                                searchResult: [
                                    {
                                        __typename: 'SearchResult',
                                        items: currentSearchResults.searchResult[0].items.filter((item: any) => {
                                            return item._uid !== resource._uid && item.name !== resource.name
                                        }),
                                    },
                                ],
                            },
                        })
                    }
                    close()
                }
            },
        })
    }

    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.medium}
                isOpen={open}
                title={`Delete ${resource?.kind}`}
                onClose={close}
                actions={[
                    <AcmButton key="cancel" variant={ButtonVariant.secondary} onClick={close}>
                        Cancel
                    </AcmButton>,
                    <AcmButton
                        isDisabled={
                            userAccessResponse.loading ||
                            (userAccessResponse.data && !userAccessResponse.data.userAccess.allowed)
                        }
                        key="confirm"
                        variant={ButtonVariant.danger}
                        onClick={() => deleteResourceFn()}
                    >
                        Delete
                    </AcmButton>,
                ]}
            >
                {userAccessResponse.error ? (
                    <AcmAlert noClose={true} variant={'danger'} title={userAccessResponse.error} />
                ) : null}
                {!userAccessResponse.loading && !userAccessResponse?.data?.userAccess.allowed ? (
                    <AcmAlert
                        noClose={true}
                        variant={'danger'}
                        title={'You are not authorized to delete this resource.'}
                    />
                ) : null}
                {deleteResourceResults.error ? (
                    <AcmAlert noClose={true} variant={'danger'} title={deleteResourceResults.error.message} />
                ) : null}
                <div
                    style={{ paddingTop: '1rem' }}
                >{`Removing ${resource?.name} is irreversible. Are you sure that you want to continue?`}</div>
            </AcmModal>
        </Fragment>
    )
}
