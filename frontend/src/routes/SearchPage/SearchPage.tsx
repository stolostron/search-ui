import _ from 'lodash'
import { AcmButton, AcmPage, AcmPageHeader, AcmSearchbar } from '@open-cluster-management/ui-components'
import { PageSection } from '@patternfly/react-core'
import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useState } from 'react'
import { searchClient } from '../../search-sdk/search-client'
import { useSearchSchemaQuery } from '../../search-sdk/search-sdk'
import { formatSearchbarSuggestions } from './search-helper'
import SavedSearchQueries from '../../components/SavedSearchQueries'

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

function RenderSearchPageContent() {
    return (
        <Fragment>
            <RenderSearchbar />
            <PageSection>
                <SavedSearchQueries />
            </PageSection>
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
