import _ from 'lodash'
import {
    AcmButton,
    AcmPage,
    AcmPageHeader,
    AcmSearchbar,
    AcmExpandableWrapper,
    AcmCountCard,
} from '@open-cluster-management/ui-components'
import { PageSection } from '@patternfly/react-core'
import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useState } from 'react'
import { searchClient } from '../../search-sdk/search-client'
import {
    useSearchSchemaQuery,
    useSavedSearchesQuery,
    useSearchResultCountQuery,
    UserSearch,
} from '../../search-sdk/search-sdk'
import { convertStringToQuery, formatSearchbarSuggestions } from './search-helper'
import SuggestQueryTemplates from '../../components/SuggestedQueryTemplates'

function RenderSearchPageContent() {
    return (
        <Fragment>
            <RenderSearchbar />
            <RenderSavedSearches />
        </Fragment>
    )
}

function RenderSearchbar() {
    const [currentQuery, setCurrentQuery] = useState('')
    const { data, loading, error } = useSearchSchemaQuery({
        client: searchClient,
    })
    if (error) {
        // TODO handle the error
        console.log(error)
    }
    const schemaValues = _.get(data, 'searchSchema.allProperties', [])
    return (
        <Fragment>
            <PageSection>
                <div style={{ display: 'flex' }}>
                    <AcmSearchbar
                        loadingSuggestions={loading}
                        queryString={currentQuery}
                        suggestions={formatSearchbarSuggestions(schemaValues, 'filter')}
                        currentQueryCallback={(newQuery) => setCurrentQuery(newQuery)}
                        toggleInfoModal={() => console.log('toggleInfoModal')}
                    />
                    <AcmButton
                        style={{ marginLeft: '1rem' }}
                        onClick={() => console.log('Save search click')}
                        isDisabled={false}
                    >
                        {'Save search'}
                    </AcmButton>
                </div>
            </PageSection>
        </Fragment>
    )
}

function SearchResultCount(input: any, queries: any, suggestedQueryTemplates: any) {
    const { data, error, loading } = useSearchResultCountQuery({
        variables: { input: input },
    })
    if (loading) {
        return <AcmExpandableWrapper children={<AcmCountCard loading />} withCount={false} expandable={false} />
    } else if (error || !data || !data.searchResult) {
        return null
    } else if (data?.searchResult) {
        const queriesResult = data.searchResult.slice(0, queries.length).map((query, index) => {
            return { ...query, ...queries }
        })
        const suggestedQueriesResult = data.searchResult.slice(queries.length).map((query, index) => {
            return { ...query, ...suggestedQueryTemplates[index] }
        })
        return (
            <Fragment>
                {queriesResult.length > 0 && (
                    <Fragment>
                        <AcmExpandableWrapper
                            children={queries.Result.reverse()}
                            headerLabel={'Saved searches'}
                            withCount={true}
                            expandable={true}
                        />
                    </Fragment>
                )}
                {suggestedQueriesResult.length > 0 && (
                    <Fragment>
                        <AcmExpandableWrapper
                            children={suggestedQueriesResult}
                            headerLabel={'Suggested search templates'}
                            withCount={false}
                            expandable={false}
                        />
                    </Fragment>
                )}
            </Fragment>
        )
    }
}

function RenderSavedSearches() {
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
    return (
        <Fragment>
            {/* {<SearchResultCount input={input} queries={queries} suggestedQueryTemplates={suggestedQueryTemplates} />} */}
        </Fragment>
    )
}

export default function SearchPage() {
    return (
        <AcmPage>
            <AcmPageHeader title="Search" />
            <RenderSearchPageContent />
        </AcmPage>
    )
}
