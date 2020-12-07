import _ from 'lodash'
import { AcmButton, AcmPage, AcmPageHeader, AcmSearchbar } from '@open-cluster-management/ui-components'
import { PageSection } from '@patternfly/react-core'
import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useState, useEffect } from 'react'
import { searchClient } from '../../search-sdk/search-client'
import SavedSearchQueries from '../../components/SavedSearchQueries'
import { useSearchSchemaQuery, useSearchCompleteQuery } from '../../search-sdk/search-sdk'
import { convertStringToQuery, formatSearchbarSuggestions, getSearchCompleteString } from './search-helper'
import { updateBrowserUrl, transformBrowserUrlToSearchString } from './urlQuery'

function RenderSearchBar(props: {
    currentQuery: string
    setCurrentQuery: React.Dispatch<React.SetStateAction<string>>
}) {
    const { currentQuery, setCurrentQuery } = props

    const searchSchemaResults = useSearchSchemaQuery({
        client: searchClient,
    })
    if (searchSchemaResults.error) {
        // TODO better error handling
        console.error('Search schema query error', searchSchemaResults.error)
    }
    const searchCompleteValue = getSearchCompleteString(currentQuery)
    const searchCompleteQuery = convertStringToQuery(currentQuery)
    searchCompleteQuery.filters = searchCompleteQuery.filters.filter((filter) => {
        return filter.property !== searchCompleteValue
    })
    const searchCompleteResults = useSearchCompleteQuery({
        client: searchClient,
        variables: {
            property: searchCompleteValue,
            query: searchCompleteQuery,
        },
    })
    // TODO dedupe searchComplete results from exidting filters
    if (searchCompleteResults.error) {
        // TODO better error handling
        console.error('Search complete query error', searchCompleteResults.error)
    }
    return (
        <Fragment>
            <PageSection>
                <div style={{ display: 'flex' }}>
                    <AcmSearchbar
                        loadingSuggestions={searchSchemaResults.loading || searchCompleteResults.loading}
                        queryString={currentQuery}
                        suggestions={
                            currentQuery === '' || !currentQuery.endsWith(':')
                                ? formatSearchbarSuggestions(
                                      _.get(searchSchemaResults, 'data.searchSchema.allProperties', []),
                                      'filter'
                                  )
                                : formatSearchbarSuggestions(
                                      _.get(searchCompleteResults, 'data.searchComplete', []),
                                      'value'
                                  )
                        }
                        currentQueryCallback={(newQuery) => {
                            setCurrentQuery(newQuery)
                            updateBrowserUrl(newQuery)
                        }}
                        toggleInfoModal={() => console.log('toggle info modal')}
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
            <PageSection>
                <SavedSearchQueries setCurrentQuery={setCurrentQuery} />
            </PageSection>
        </Fragment>
    )
}

export default function SearchPage() {
    const [currentQuery, setCurrentQuery] = useState('')
    useEffect(() => {
        setCurrentQuery(currentQuery)
    }, [currentQuery])
    const {
        prefillSearchQuery: searchQuery = '',
        // preSelectedRelatedResources = [] // used to show any related resource on search page navigation
    } = transformBrowserUrlToSearchString(window.location.search || '')

    return (
        <AcmPage>
            <AcmPageHeader title="Search" />
            <Fragment>
                <RenderSearchBar currentQuery={searchQuery} setCurrentQuery={setCurrentQuery} />
            </Fragment>
        </AcmPage>
    )
}
