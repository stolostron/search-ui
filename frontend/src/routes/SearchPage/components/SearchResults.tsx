import '@patternfly/react-core/dist/styles/base.css'
import _ from 'lodash'
import { Fragment, useState } from 'react'
import {
    AcmAlert,
    AcmExpandableSection,
    AcmTable,
    AcmPageCard,
    AcmTile,
    AcmExpandableWrapper,
    AcmLoadingPage,
} from '@open-cluster-management/ui-components'
import { searchClient } from '../../../search-sdk/search-client'
import {
    useSearchResultItemsQuery,
    useSearchResultRelatedCountQuery,
    useSearchResultRelatedItemsQuery,
} from '../../../search-sdk/search-sdk'
import { convertStringToQuery } from '../search-helper'
import {
    DeleteResourceModal,
    IDeleteModalProps,
    ClosedDeleteModalProps,
} from '../components/Modals/DeleteResourceModal'
import { PageSection } from '@patternfly/react-core'
import searchDefinitions from '../searchDefinitions'

function RenderRelatedTables(
    currentQuery: string,
    selectedKinds: string[],
    setDeleteResource: React.Dispatch<React.SetStateAction<IDeleteModalProps>>
) {
    const queryFilters = convertStringToQuery(currentQuery)
    const { data, loading, error } = useSearchResultRelatedItemsQuery({
        skip: selectedKinds.length === 0 || queryFilters.keywords.length > 0,
        client: searchClient,
        variables: {
            input: [{ ...convertStringToQuery(currentQuery), relatedKinds: selectedKinds }],
        },
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
        return (
            <PageSection>
                <AcmAlert
                    noClose={true}
                    variant={'danger'}
                    isInline={true}
                    title={'Error querying related resources'}
                    subtitle={error ? error.message : ''}
                />
            </PageSection>
        )
    }
    const relatedResultItems = data.searchResult[0]?.related || []
    return selectedKinds.map((kind) => {
        const items = relatedResultItems.filter((item) => item?.kind === kind)
        if (items && items[0]?.items && items.length > 0) {
            return (
                <AcmPageCard key={`related-table-${kind}`}>
                    <AcmExpandableSection
                        label={`Related ${kind.charAt(0).toUpperCase()}${kind.slice(1)} (${items[0]?.items.length})`}
                        expanded={true}
                    >
                        <AcmTable
                            plural=""
                            items={items[0]?.items}
                            columns={_.get(
                                searchDefinitions,
                                `[${kind}].columns`,
                                searchDefinitions['genericresource'].columns
                            )}
                            keyFn={(item: any) => item._uid.toString()}
                            tableActions={[]}
                            rowActions={
                                kind !== 'cluster' && kind !== 'release'
                                    ? [
                                          {
                                              id: 'delete',
                                              title: `Delete ${kind}`,
                                              click: (item: any) => {
                                                  setDeleteResource({
                                                      open: true,
                                                      close: () => setDeleteResource(ClosedDeleteModalProps),
                                                      resource: item,
                                                      currentQuery,
                                                      relatedResource: true,
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
        }
        return null
    })
}

function RenderRelatedTiles(
    currentQuery: string,
    selectedKinds: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
) {
    const queryFilters = convertStringToQuery(currentQuery)
    const { data, error, loading } = useSearchResultRelatedCountQuery({
        skip: queryFilters.keywords.length > 0,
        client: searchClient,
        variables: {
            input: [convertStringToQuery(currentQuery)],
        },
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
    } else if (error) {
        return (
            <PageSection>
                <AcmAlert
                    noClose={true}
                    variant={'danger'}
                    isInline={true}
                    title={'Error querying related search results'}
                    subtitle={error ? error.message : ''}
                />
            </PageSection>
        )
    } else if (data && data.searchResult) {
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
                                    const updatedKinds =
                                        selectedKinds.indexOf(count!.kind) > -1
                                            ? selectedKinds.filter((kind) => kind !== count!.kind)
                                            : [count!.kind, ...selectedKinds]
                                    setSelected(updatedKinds)
                                }}
                                relatedResourceData={{ count: count!.count || 0, kind: count!.kind }}
                            />
                        )
                    })}
                </AcmExpandableWrapper>
            </PageSection>
        )
    }
    return null
}

function RenderSearchTables(
    currentQuery: string,
    setDeleteResource: React.Dispatch<React.SetStateAction<IDeleteModalProps>>,
    selectedRelatedKinds: string[]
) {
    const { data, error, loading } = useSearchResultItemsQuery({
        client: searchClient,
        variables: {
            input: [convertStringToQuery(currentQuery)],
        },
    })

    if (loading) {
        return (
            <PageSection>
                <AcmLoadingPage />
            </PageSection>
        )
    } else if (error || !data || !data.searchResult) {
        return (
            <PageSection>
                <AcmAlert
                    noClose={true}
                    variant={'danger'}
                    isInline={true}
                    title={'Error querying search results'}
                    subtitle={error ? error.message : ''}
                />
            </PageSection>
        )
    }
    const searchResultItems = data.searchResult[0]?.items || []
    const uniqueKinds: string[] = _.uniq(searchResultItems.map((item: { kind: string }) => item.kind))

    if (searchResultItems.length === 0) {
        return (
            <PageSection>
                <AcmAlert
                    noClose={true}
                    variant={'warning'}
                    isInline={true}
                    title={'No results found for the current search criteria.'}
                />
            </PageSection>
        )
    }

    return uniqueKinds.map((kind: string) => {
        const items = searchResultItems.filter(
            (item: { kind: string; __type: string }) => item.kind === kind || item.__type === kind
        )
        return (
            <AcmPageCard key={`results-table-${kind}`}>
                <AcmExpandableSection
                    label={`${kind.charAt(0).toUpperCase()}${kind.slice(1)} (${items.length})`}
                    expanded={selectedRelatedKinds.length === 0}
                >
                    <AcmTable
                        plural=""
                        items={items}
                        columns={_.get(
                            searchDefinitions,
                            `[${kind}].columns`,
                            searchDefinitions['genericresource'].columns
                        )}
                        keyFn={(item: any) => item._uid.toString()}
                        tableActions={[]}
                        rowActions={
                            kind !== 'cluster' && kind !== 'release'
                                ? [
                                      {
                                          id: 'delete',
                                          title: `Delete ${kind}`,
                                          click: (item: any) => {
                                              setDeleteResource({
                                                  open: true,
                                                  close: () => setDeleteResource(ClosedDeleteModalProps),
                                                  resource: item,
                                                  currentQuery,
                                                  relatedResource: false,
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
}

export default function SearchResults(props: { currentQuery: string; preSelectedRelatedResources: string[] }) {
    const { currentQuery, preSelectedRelatedResources } = props
    const [selected, setSelected] = useState<string[]>(preSelectedRelatedResources)
    const [deleteResource, setDeleteResource] = useState<IDeleteModalProps>(ClosedDeleteModalProps)

    return (
        <Fragment>
            <DeleteResourceModal
                open={deleteResource.open}
                close={deleteResource.close}
                resource={deleteResource.resource}
                currentQuery={deleteResource.currentQuery}
                relatedResource={deleteResource.relatedResource}
            />
            {RenderRelatedTiles(currentQuery, selected, setSelected)}
            {RenderRelatedTables(currentQuery, selected, setDeleteResource)}
            {RenderSearchTables(currentQuery, setDeleteResource, selected)}
        </Fragment>
    )
}
