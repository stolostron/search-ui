import _ from 'lodash'
import {
    AcmButton,
    AcmDropdown,
    AcmLaunchLink,
    AcmPage,
    AcmPageHeader,
    AcmSearchbar,
    AcmSecondaryNav,
    AcmSecondaryNavItem,
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
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    divider: {
        position: 'relative',
        height: '1.4rem',
        top: '.5rem',
        borderLeft: '1px solid #dfe6eb',
    },
})

function RenderSearchBar(props: {
    searchQuery: string
    setCurrentQuery: React.Dispatch<React.SetStateAction<string>>
}) {
    const { searchQuery, setCurrentQuery } = props
    const [saveSearch, setSaveSearch] = useState<string>()
    const searchSchemaResults = useSearchSchemaQuery({
        skip: searchQuery.endsWith(':'),
        client: searchClient,
    })
    if (searchSchemaResults.error) {
        // TODO better error handling
        console.error('Search schema query error', searchSchemaResults.error)
    }
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
    if (searchCompleteResults.error) {
        // TODO better error handling
        console.error('Search complete query error', searchCompleteResults.error)
    }
    return (
        <Fragment>
            <PageSection>
                <SaveAndEditSearchModal saveSearch={saveSearch} onClose={() => setSaveSearch(undefined)} />
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
                        toggleInfoModal={() => console.log('toggle info modal')}
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

function RenderDropDownAndNewTab(props: any) {
    const { data } = useSavedSearchesQuery({
        client: searchClient,
    })

    console.log(props)

    const queries = data?.items ?? ([] as UserSearch[])
    console.log('queries', queries)
    const onHover = () => console.log('hovered')
    console.log('props', props)

    const dropdownItems: any[] = queries.map((query) => {
        return { id: query!.id, text: query!.name, searchtext: query!.searchText }
    })
    const [active, setActive] = useState('first')
    const classes = useStyles()
    return (
        <AcmSecondaryNav>
            <AcmSecondaryNavItem isActive={active === 'first'} onClick={() => setActive('first')}>
                <AcmDropdown
                    onHover={onHover}
                    isDisabled={false}
                    tooltip={'default tooltip'}
                    id="dropdown"
                    onSelect={(id) => console.log(id)}
                    text={'test'}
                    dropdownItems={dropdownItems}
                    isKebab={false}
                />
            </AcmSecondaryNavItem>
            <div className={classes.divider} />
            <AcmSecondaryNavItem isActive={active === 'second'} onClick={() => setActive('second')}>
                <AcmLaunchLink links={[{ id: 'search', text: 'Open new search tab', href: '/search' }]} />
            </AcmSecondaryNavItem>
        </AcmSecondaryNav>
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
