import _ from 'lodash'
import {
    AcmButton,
    AcmPage,
    AcmPageHeader,
    AcmSearchbar,
} from "@open-cluster-management/ui-components"
import {
    PageSection,
} from "@patternfly/react-core"
import "@patternfly/react-core/dist/styles/base.css"
import React, { Fragment, useState } from "react"
import { searchClient } from "../search-sdk/search-client"
import { useSearchSchemaQuery /*, useSearchCompleteQuery*/ } from "../search-sdk/search-sdk"
import { /* convertStringToQuery,*/ formatSearchbarSuggestions } from './search-helper'

function RenderSearchbar() {
    const [currentQuery, setCurrentQuery] = useState('')
    const { data, loading, error } = useSearchSchemaQuery({
        client: searchClient,
    })
    if (error) {
        // TODO handle the error
    }
    const schemaValues = _.get(data, 'searchSchema.allProperties', [])
    return (
        <Fragment>
            <PageSection>
                <div style={{ display: 'flex'}}>
                    <AcmSearchbar
                        loadingSuggestions={loading}
                        queryString={currentQuery}
                        suggestions={formatSearchbarSuggestions(schemaValues, 'filter')}
                        currentQueryCallback={(newQuery) => setCurrentQuery(newQuery)}
                        toggleInfoModal={() => console.log('toggleInfoModal')} />
                    <AcmButton style={{ marginLeft: '1rem' }} onClick={() => console.log('Save search click')} isDisabled={false}>
                        {'Save search'}
                    </AcmButton>
                </div>
            </PageSection>
        </Fragment>
    )
}

export function SearchPage() {
    return (
        <AcmPage>
            <AcmPageHeader title="Search" />
            <RenderSearchbar />
        </AcmPage>
    );
}
