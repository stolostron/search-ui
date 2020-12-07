import React, { Fragment } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { searchClient } from '../search-sdk/search-client'
import { useSavedSearchesQuery, useSearchResultCountQuery, UserSearch } from '../search-sdk/search-sdk'
import { convertStringToQuery } from '../routes/SearchPage/search-helper'
import SuggestQueryTemplates from './SuggestedQueryTemplates'
import { AcmExpandableWrapper, AcmCountCard } from '@open-cluster-management/ui-components'
import SearchQueryCard from './SearchQueryCard'

function SearchResultCount(input: any, queries: any, suggestedQueryTemplates: any): any {
    const { data, error, loading } = useSearchResultCountQuery({
        variables: { input: input },
        client: searchClient,
    })

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
        const queriesResult = data.searchResult.slice(0, queries.length).map((query, index) => {
            return { ...query, ...queries[index] }
        })
        const suggestedQueriesResult = data.searchResult.slice(queries.length).map((query, index) => {
            return { ...query, ...suggestedQueryTemplates[index] }
        })
        return (
            <Fragment>
                {queriesResult.length > 0 && (
                    <AcmExpandableWrapper
                        maxHeight={'16rem'}
                        headerLabel={'Saved searches'}
                        withCount={true}
                        expandable={true}
                    >
                        {queriesResult.map((query) => {
                            return <SearchQueryCard key={query.id} {...query} />
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
                            return <SearchQueryCard key={query.id} {...query} hasIcon={true} />
                        })}
                    </AcmExpandableWrapper>
                )}
            </Fragment>
        )
    }
}

export default function SavedSearchQueries() {
    const { data } = useSavedSearchesQuery({
        client: searchClient,
    })
    const queries = data?.items ?? ([] as UserSearch[])
    // each query should contain ---- description, name, results = [], resultHeader
    const suggestedQueryTemplates = SuggestQueryTemplates?.templates ?? ([] as UserSearch[])
    // combine the suggested queries and saved queries
    const input = [
        ...queries!.map((query) => convertStringToQuery(query!.searchText as string)),
        ...suggestedQueryTemplates.map((query: { searchText: string }) => convertStringToQuery(query.searchText)),
    ]
    return SearchResultCount(input, queries, suggestedQueryTemplates)
}
