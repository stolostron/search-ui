import _ from 'lodash'
import {
    AcmAlert,
    AcmButton,
    AcmDropdown,
    AcmLaunchLink,
    AcmPage,
    AcmPageHeader,
    AcmSearchbar,
    AcmActionGroup,
} from '@open-cluster-management/ui-components'
import { PageSection } from '@patternfly/react-core'
import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useState, useEffect } from 'react'
import { searchClient } from '../../search-sdk/search-client'
import SavedSearchQueries from './components/SavedSearchQueries'
import SearchResults from './components/SearchResults'
import {
    useSearchSchemaQuery,
    useSearchCompleteQuery,
    useSavedSearchesQuery,
    UserSearch,
} from '../../search-sdk/search-sdk'
import { convertStringToQuery, formatSearchbarSuggestions, getSearchCompleteString } from './search-helper'
import { updateBrowserUrl, transformBrowserUrlToSearchString } from './urlQuery'
import { SaveAndEditSearchModal } from './components/Modals/SaveAndEditSearchModal'
import { SearchInfoModal } from './components/Modals/SearchInfoModal'
import { makeStyles } from '@material-ui/styles'
import { ApolloError } from '@apollo/client'

const useStyles = makeStyles({
    actionGroup: {
        backgroundColor: 'var(--pf-global--BackgroundColor--100)',
        paddingRight: 'var(--pf-c-page__main-section--PaddingRight)',
        paddingLeft: 'var(--pf-c-page__main-section--PaddingLeft)',
        paddingBottom: 'var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom)',
    },
    dropdown: {
        '& ul': {
            right: 'unset !important',
        },
    },
})

// Adds AcmAlert to page if there's errors from the Apollo queries.
function HandleErrors(schemaError: ApolloError|undefined, completeError: ApolloError|undefined){
    if (schemaError) {
        console.error('Search schema query error.', schemaError)
    }
    if (completeError) {
        console.error('Search complete query error.', completeError)
    }
    if (schemaError || completeError){
        return (
            <div style={{ marginBottom: "1rem" }}>
                <AcmAlert
                    noClose
                    variant={'danger'}
                    isInline
                    title="An unexpected error occurred."
                    subtitle="The search service is unavailable." />
            </div>
        )
    }
}

function RenderSearchBar(props: {
    searchQuery: string
    setCurrentQuery: React.Dispatch<React.SetStateAction<string>>
}) {
    const { searchQuery, setCurrentQuery } = props
    const [saveSearch, setSaveSearch] = useState<string>()
    const [open, toggleOpen] = useState<boolean>(false)
    const toggle = () => toggleOpen(!open)
    const searchSchemaResults = useSearchSchemaQuery({
        skip: searchQuery.endsWith(':'),
        client: searchClient,
    })
  
    const searchCompleteValue = getSearchCompleteString(searchQuery)
    const searchCompleteQuery = convertStringToQuery(searchQuery)
    searchCompleteQuery.filters = searchCompleteQuery.filters.filter((filter) => {
        return filter.property !== searchCompleteValue
    })
    const searchCompleteResults = useSearchCompleteQuery({
        skip: !searchQuery.endsWith(':'),
        client: searchClient,
        variables: {
            property: searchCompleteValue,
            query: searchCompleteQuery,
        },
    })

    return (
        <Fragment>
            <PageSection>
                <SaveAndEditSearchModal saveSearch={saveSearch} onClose={() => setSaveSearch(undefined)} />
                <SearchInfoModal isOpen={open} onClose={() => toggleOpen(false)} />
                { HandleErrors(searchSchemaResults.error, searchCompleteResults.error) }
                <div style={{ display: 'flex' }}>
                    <AcmSearchbar
                        loadingSuggestions={searchSchemaResults.loading || searchCompleteResults.loading}
                        queryString={searchQuery}
                        suggestions={
                            searchQuery === '' || !searchQuery.endsWith(':')
                                ? formatSearchbarSuggestions(
                                      _.get(searchSchemaResults, 'data.searchSchema.allProperties', []),
                                      'filter',
                                      '' // Dont need to de-dupe filters
                                  )
                                : formatSearchbarSuggestions(
                                      _.get(searchCompleteResults, 'data.searchComplete', []),
                                      'value',
                                      searchQuery // pass current search query in order to de-dupe already selected values
                                  )
                        }
                        currentQueryCallback={(newQuery) => {
                            setCurrentQuery(newQuery)
                            updateBrowserUrl(newQuery)
                        }}
                        toggleInfoModal={toggle}
                    />
                    <AcmButton
                        style={{ marginLeft: '1rem' }}
                        onClick={() => setSaveSearch(searchQuery)}
                        isDisabled={searchQuery === ''}
                    >
                        {'Save search'}
                    </AcmButton>
                </div>
            </PageSection>
        </Fragment>
    )
}

function RenderDropDownAndNewTab(props: { setCurrentQuery: React.Dispatch<React.SetStateAction<string>> }) {
    const classes = useStyles()

    const [selectedSearch, setSelectedSearch] = useState('Saved searches')
    const { data } = useSavedSearchesQuery({
        client: searchClient,
    })

    const queries = data?.items ?? ([] as UserSearch[])

    const SelectQuery = (id: string) => {
        if (id === 'savedSearchesID') {
            props.setCurrentQuery('')
            updateBrowserUrl('')
            setSelectedSearch('Saved searches')
        } else {
            const selectedQuery = queries!.filter((query) => query!.id === id)
            props.setCurrentQuery(selectedQuery[0]!.searchText || '')
            updateBrowserUrl(selectedQuery[0]!.searchText || '')
            setSelectedSearch(selectedQuery[0]!.name || '')
        }
    }

    const SavedSearchDropdown = () => {
        const dropdownItems: any[] = queries.map((query) => {
            return { id: query!.id, text: query!.name }
        })

        dropdownItems.unshift({ id: 'savedSearchesID', text: 'Saved searches', searchText: '' })

        return (
            <div className={classes.dropdown}>
                <AcmDropdown
                    isDisabled={false}
                    id="dropdown"
                    onSelect={(id) => {
                        SelectQuery(id)
                    }}
                    text={selectedSearch}
                    dropdownItems={dropdownItems}
                    isKebab={false}
                />
            </div>
        )
    }

    return (
        <div className={classes.actionGroup}>
            <AcmActionGroup>
                <SavedSearchDropdown />
                <AcmLaunchLink links={[{ id: 'search', text: 'Open new search tab', href: '/search' }]} />
            </AcmActionGroup>
        </div>
    )
}

export default function SearchPage() {
    // Only using setCurrentQuery to trigger a re-render
    // useEffect using window.location to trigger re-render doesn't work cause react hooks can't use window
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
        prefillSearchQuery: searchQuery = '',
        preSelectedRelatedResources = [], // used to show any related resource on search page navigation
    } = transformBrowserUrlToSearchString(window.location.search || '')
    const [currentQuery, setCurrentQuery] = useState(searchQuery)
    useEffect(() => {
        setCurrentQuery(currentQuery)
    }, [currentQuery])
    const query = convertStringToQuery(searchQuery)
    return (
        <AcmPage>
            <AcmPageHeader title="Search" />
            <RenderDropDownAndNewTab setCurrentQuery={setCurrentQuery} />
            <RenderSearchBar searchQuery={searchQuery} setCurrentQuery={setCurrentQuery} />
            {searchQuery !== '' && (query.keywords.length > 0 || query.filters.length > 0) ? (
                <SearchResults currentQuery={searchQuery} preSelectedRelatedResources={preSelectedRelatedResources} />
            ) : (
                <SavedSearchQueries setCurrentQuery={setCurrentQuery} />
            )}
        </AcmPage>
    )
}
