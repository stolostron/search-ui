import '@patternfly/react-core/dist/styles/base.css'
import _ from 'lodash'
import { Fragment, useState } from 'react'
import { AcmExpandableSection, AcmTable, AcmPageCard, AcmTile, AcmExpandableWrapper } from '@open-cluster-management/ui-components'
import { searchClient } from '../../../search-sdk/search-client'
import {
    useSearchResultItemsQuery,
    useSearchResultRelatedCountQuery,
    useSearchResultRelatedItemsQuery } from '../../../search-sdk/search-sdk'
import { convertStringToQuery } from '../search-helper'
import { DeleteResourceModal, IDeleteModalProps, ClosedDeleteModalProps } from '../components/Modals/DeleteResourceModal'
import { PageSection } from '@patternfly/react-core'
import searchDefinitions from '../searchDefinitions'

function RenderRelatedTables(currentQuery: string, selectedKinds: string[], setDeleteResource: React.Dispatch<React.SetStateAction<IDeleteModalProps>>) {
    const { data, loading, error } = useSearchResultRelatedItemsQuery({
        skip: selectedKinds.length === 0,
        client: searchClient,
        variables: {
            input: [{ ...convertStringToQuery(currentQuery), relatedKinds: selectedKinds}]
        }
    })

    if (loading === false && !error && !data) {
        // Query was skipped because no related resources have been selected
        return null
    }
    if (loading) {
        // Return loading table
        return <PageSection>{'Loading related resources'}</PageSection>
    } else if (error || !data || !data.searchResult) {
        // TODO better error handling
        console.error(error)
        return <PageSection>{'Error querying related resources'}</PageSection>
    }

    const relatedResultItems = data.searchResult[0]?.related || []
    return (
        selectedKinds.map(kind => {
            const items = relatedResultItems[0]?.items.filter((item: { kind: string; __type: string }) => item.kind === kind || item.__type === kind )
            return (
                <AcmPageCard key={`related-table-${kind}`} >
                    <AcmExpandableSection label={`Related ${kind.charAt(0).toUpperCase()}${kind.slice(1)} (${items.length})`} expanded={true}>
                        <AcmTable
                            plural=""
                            items={items}
                            columns={_.get(searchDefinitions, `[${kind}].columns`, searchDefinitions['genericresource'].columns)}
                            keyFn={(item: any) => item._uid.toString()}
                            tableActions={[]}
                            rowActions={(kind !== 'cluster' && kind !== 'release')
                                ? [
                                    {
                                        id: 'delete',
                                        title: `Delete ${kind}`,
                                        click: (item: any) => {
                                            setDeleteResource({
                                                open: true,
                                                close: () => setDeleteResource(ClosedDeleteModalProps),
                                                resource: item,
                                            })
                                        },
                                    },
                                ]
                                : []
                            }
                            bulkActions={[]}
                        />
                    </AcmExpandableSection>
                </AcmPageCard>
            )
        })
    )
}

function RenderRelatedTiles(currentQuery: string, selectedKinds: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) {
    const { data, error, loading } = useSearchResultRelatedCountQuery({
        // TODO skip: ??
        client: searchClient,
        variables: {
            input: [convertStringToQuery(currentQuery)]
        }
    })
    if (loading) {
        return (
            <PageSection>
                <AcmExpandableWrapper withCount={false} expandable={false}>
                    <AcmTile loading={true} title={'loading'} />
                    <AcmTile loading={true} title={'loading'} />
                    <AcmTile loading={true} title={'loading'} />
                    <AcmTile loading={true} title={'loading'} />
                </AcmExpandableWrapper>
            </PageSection>
        )
    } else if (error || !data || !data.searchResult) {
        // TODO better error handling
        console.error(error)
        return <PageSection>{'Error querying related results'}</PageSection>
    }
    const relatedCounts = data.searchResult[0]!.related || []
    return (
        <PageSection>
            <AcmExpandableWrapper maxHeight={'10rem'} withCount={true} expandable={true}>
                {relatedCounts.map((count) => {
                    return (
                        <AcmTile
                            key={`related-tile-${count!.kind}`}
                            isSelected={selectedKinds.indexOf(count!.kind) > -1}
                            title={''}
                            onClick={() => {
                                const updatedKinds = selectedKinds.indexOf(count!.kind) > -1
                                    ? selectedKinds.filter(kind => kind !== count!.kind)
                                    : [count!.kind, ...selectedKinds]
                                setSelected(updatedKinds)
                            }}
                            relatedResourceData={{ count: count!.count || 0, kind: count!.kind }} />
                    )
                })}
            </AcmExpandableWrapper>
        </PageSection>
    )
}


function RenderSearchTables(currentQuery: string, setDeleteResource: React.Dispatch<React.SetStateAction<IDeleteModalProps>>) {
    const { data, error, loading } = useSearchResultItemsQuery({
        // TODO skip: ??
        client: searchClient,
        variables: {
            input: [convertStringToQuery(currentQuery)]
        }
    })

    if (loading) {
        // Return loading table
        return <PageSection>{'Loading search results'}</PageSection>
    } else if (error || !data || !data.searchResult) {
        // TODO better error handling
        console.error(error)
        return <PageSection>{'Error querying search results'}</PageSection>
    }
    const searchResultItems = data.searchResult[0]?.items || []
    const uniqueKinds: string[] =  _.uniq(searchResultItems.map((item: { kind: string }) => item.kind))

    return (
        uniqueKinds.map((kind: string ) => {
            const items = searchResultItems.filter((item: { kind: string; __type: string }) => item.kind === kind || item.__type === kind )
            return (
                <AcmPageCard key={`results-table-${kind}`} >
                    <AcmExpandableSection label={`${kind.charAt(0).toUpperCase()}${kind.slice(1)} (${items.length})`} expanded={true}>
                        <AcmTable
                            plural=""
                            items={items}
                            columns={_.get(searchDefinitions, `[${kind}].columns`, searchDefinitions['genericresource'].columns)}
                            keyFn={(item: any) => item._uid.toString()}
                            tableActions={[]}
                            rowActions={(kind !== 'cluster' && kind !== 'release')
                            ? [
                                {
                                    id: 'delete',
                                    title: `Delete ${kind}`,
                                    click: (item: any) => {
                                        setDeleteResource({
                                            open: true,
                                            close: () => setDeleteResource(ClosedDeleteModalProps),
                                            resource: item,
                                        })
                                    },
                                },
                            ]
                            : []
                        }
                            bulkActions={[]}
                        />
                    </AcmExpandableSection>
                </AcmPageCard>
            )
        })
    )
}

export default function SearchResults(props: { currentQuery: string, preSelectedRelatedResources: string[] }) {
    const { currentQuery, preSelectedRelatedResources } = props
    const [selected, setSelected] = useState<string[]>(preSelectedRelatedResources)
    const [deleteResource, setDeleteResource] = useState<IDeleteModalProps>(ClosedDeleteModalProps)

    return (
        <Fragment>
            <DeleteResourceModal
                open={deleteResource.open}
                close={deleteResource.close}
                resource={deleteResource.resource} />
            {RenderRelatedTiles(currentQuery, selected, setSelected)}
            {RenderRelatedTables(currentQuery, selected, setDeleteResource)}
            {RenderSearchTables(currentQuery, setDeleteResource)}
        </Fragment>
    )
}
