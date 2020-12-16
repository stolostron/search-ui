import '@patternfly/react-core/dist/styles/base.css'
import _ from 'lodash'
import { Fragment, useState } from 'react'
import { AcmExpandableSection, AcmTable, AcmPageCard, AcmTile, AcmExpandableWrapper, AcmLoadingPage } from '@open-cluster-management/ui-components'
import { searchClient } from '../../../search-sdk/search-client'
import {
    useSearchResultItemsQuery,
    useSearchResultRelatedCountQuery,
    useSearchResultRelatedItemsQuery } from '../../../search-sdk/search-sdk'
import { convertStringToQuery } from '../search-helper'
import { PageSection } from '@patternfly/react-core'
import searchDefinitions from '../searchDefinitions'

function RenderRelatedTables(currentQuery: string, selectedKinds: string[]) {
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
        return (
            <PageSection>
                <AcmLoadingPage />
            </PageSection>
        )
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
                            rowActions={[
                                // {
                                //     id: 'delete',
                                //     title: 'Delete item',
                                //     click: (item: IExampleData) => {
                                //         setItems(items ? items.filter((i) => i.uid !== item.uid) : [])
                                //     },
                                // },
                            ]}
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


function RenderSearchResults(currentQuery: string) {
    const { data, error, loading } = useSearchResultItemsQuery({
        // TODO skip: ??
        client: searchClient,
        variables: {
            input: [convertStringToQuery(currentQuery)]
        }
    })

    if (loading) {
        return (
            <PageSection>
                <AcmLoadingPage />
            </PageSection>
        )
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
                            rowActions={[
                                // if NOT cluster and NOT release kind -> delete action
                                // {
                                //     id: 'delete',
                                //     title: 'Delete item',
                                //     click: (item: IExampleData) => {
                                //         setItems(items ? items.filter((i) => i.uid !== item.uid) : [])
                                //     },
                                // },
                            ]}
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
    let [selected, setSelected] = useState<string[]>(preSelectedRelatedResources)

    return (
        <Fragment>
            {RenderRelatedTiles(currentQuery, selected, setSelected)}
            {RenderRelatedTables(currentQuery, selected)}
            {RenderSearchResults(currentQuery)}
        </Fragment>
    )
}
