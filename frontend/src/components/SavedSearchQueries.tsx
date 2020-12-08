import React, { Fragment, useState } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { searchClient } from '../search-sdk/search-client'
import {
    useSavedSearchesQuery,
    useSearchResultCountQuery,
    UserSearch,
    SavedSearchesDocument,
} from '../search-sdk/search-sdk'
import { convertStringToQuery } from '../routes/SearchPage/search-helper'
import SuggestQueryTemplates from './SuggestedQueryTemplates'
import { AcmExpandableWrapper, AcmCountCard } from '@open-cluster-management/ui-components'
import { updateBrowserUrl } from '../routes/SearchPage/urlQuery'
import { SaveSearchModal, ShareSearchModal, DeleteSearchModal } from './Modals'

function SearchResultCount(input: any, queries: any, suggestedQueryTemplates: any, setCurrentQuery: any): any {
    const { data, error, loading } = useSearchResultCountQuery({
        variables: { input: input },
        client: searchClient,
    })

    const [saveSearch, setSaveSearch] = useState(undefined)
    const [shareSearch, setShareSearch] = useState(undefined)
    const [deleteSearch, setDeleteSearch] = useState(undefined)

    if (loading) {
        return (
            <AcmExpandableWrapper withCount={false} expandable={false}>
                <AcmCountCard loading />
                <AcmCountCard loading />
                <AcmCountCard loading />
            </AcmExpandableWrapper>
        )
    } else if (error || !data || !data.searchResult) {
        return null
    } else if (data && data.searchResult) {
        const savedQueriesResult = data.searchResult.slice(0, queries.length).map((query, index) => {
            return { ...query, ...queries[index] }
        })
        const suggestedQueriesResult = data.searchResult.slice(queries.length).map((query, index) => {
            return { ...query, ...suggestedQueryTemplates[index] }
        })
        return (
            <Fragment>
                <SaveSearchModal saveSearch={saveSearch} onClose={() => setSaveSearch(undefined)} />
                <ShareSearchModal shareSearch={shareSearch} onClose={() => setShareSearch(undefined)} />
                <DeleteSearchModal deleteSearch={deleteSearch} onClose={() => setDeleteSearch(undefined)} />
                {savedQueriesResult.length > 0 && (
                    <AcmExpandableWrapper
                        maxHeight={'16rem'}
                        headerLabel={'Saved searches'}
                        withCount={true}
                        expandable={true}
                    >
                        {savedQueriesResult.map((query) => {
                            return (
                                <AcmCountCard
                                    key={query.id}
                                    cardHeader={{
                                        hasIcon: false,
                                        title: query.name,
                                        description: query.description,
                                        actions: [
                                            { text: 'Edit', handleAction: () => setSaveSearch(query) },
                                            { text: 'Share', handleAction: () => setShareSearch(query) },
                                            { text: 'Delete', handleAction: () => setDeleteSearch(query) },
                                        ],
                                    }}
                                    onCardClick={() => {
                                        setCurrentQuery(query.searchText)
                                        updateBrowserUrl(query.searchText)
                                    }}
                                    count={query.count}
                                    countTitle="Results"
                                />
                            )
                        })}
                    </AcmExpandableWrapper>
                )}
                {suggestedQueriesResult.length > 0 && (
                    <AcmExpandableWrapper
                        headerLabel={'Suggested search templates'}
                        withCount={false}
                        expandable={false}
                    >
                        {suggestedQueriesResult.map((query) => {
                            return (
                                <AcmCountCard
                                    key={query.id}
                                    cardHeader={{
                                        hasIcon: true,
                                        title: query.name,
                                        description: query.description,
                                        actions: [{ text: 'Share', handleAction: () => setShareSearch(query) }],
                                    }}
                                    onCardClick={() => {
                                        setCurrentQuery(query.searchText)
                                        updateBrowserUrl(query.searchText)
                                    }}
                                    count={query.count}
                                    countTitle="Results"
                                />
                            )
                        })}
                    </AcmExpandableWrapper>
                )}
            </Fragment>
        )
    }
}

export default function SavedSearchQueries(props: { setCurrentQuery: React.Dispatch<React.SetStateAction<string>> }) {
    const { data } = useSavedSearchesQuery({
        client: searchClient,
    })
    const queries = data?.items ?? ([] as UserSearch[])
    // each query should contain ---- description, name, results = [], resultHeader
    const suggestedQueryTemplates = SuggestQueryTemplates?.templates ?? ([] as UserSearch[])
    // combine the suggested queries and saved queries
    const input = [
        ...queries.map((query) => convertStringToQuery(query!.searchText as string)),
        ...suggestedQueryTemplates.map((query: { searchText: string }) => convertStringToQuery(query.searchText)),
    ]
    return SearchResultCount(input, queries, suggestedQueryTemplates, props.setCurrentQuery)
}
