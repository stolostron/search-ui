// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
/* istanbul ignore file */

import { AcmHeader } from '@open-cluster-management/ui-components'
import '@patternfly/react-core/dist/styles/base.css'
import { lazy } from 'react'
import { useRecoilState } from 'recoil'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './lib/i18n'
import { acmRouteState } from './util'

const express = require('express')
const hsts = require('hsts')
const app = express()
const globalSTS = hsts.getSTS({'max-age':{'days': 365}});
app.use(globalSTS);


const SearchPage = lazy(() => import('./routes/SearchPage/SearchPage'))
const DetailsPage = lazy(() => import('./routes/DetailsPage/DetailsPage'))
const OverviewPage = lazy(() => import('./routes/Overview/OverviewPage'))

// Function to handle deprecated selfLink in old multicloud/details url
function getUrlParams() {
    const baseSegments = window.location.pathname.split('/').slice(3)
    if (baseSegments[baseSegments.length - 1] === 'logs') {
        baseSegments.pop()
    }
    const cluster = baseSegments[0]
    const name = baseSegments[baseSegments.length - 1]
    const kind = baseSegments[baseSegments.length - 2]
    const isNamespaced = baseSegments[baseSegments.length - 4] === 'namespaces'
    const namespace = isNamespaced ? baseSegments[baseSegments.length - 3] : ''
    const apiversion = isNamespaced
        ? baseSegments.slice(1, baseSegments.indexOf('namespaces')).join('/')
        : baseSegments.slice(1, baseSegments.indexOf(kind)).join('/')
    let resourceUrlParams = ''
    resourceUrlParams = `${resourceUrlParams}${cluster !== '' ? `cluster=${cluster}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${kind !== '' ? `&kind=${kind}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${apiversion !== '' ? `&apiversion=${apiversion}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${namespace !== '' ? `&namespace=${namespace}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${name !== '' ? `&name=${name}` : ''}`
    return `?${encodeURIComponent(resourceUrlParams)}`
}

function App() {
    const [route] = useRecoilState(acmRouteState)
    return (
        <BrowserRouter>
            <AcmHeader route={route}>
                <Switch>
                    {/* New UI Paths */}
                    <Route path={'/overview'} component={OverviewPage} />
                    <Route exact path={'/search'} component={SearchPage} />
                    <Route path={'/resources'} component={DetailsPage} />

                    {/* Old UI Redirects */}
                    <Redirect from={'/multicloud/overview'} to={'/overview'} />
                    <Redirect
                        from={'/multicloud/search'}
                        to={{ pathname: '/search', search: window.location.search }}
                    />
                    <Redirect
                        from={'/multicloud/details'}
                        to={{
                            pathname: '/resources',
                            search: getUrlParams(),
                        }}
                    />

                    {/* Redirect to base search page on all other paths */}
                    <Route exact path="*">
                        <Redirect to={'/search'} />
                    </Route>
                </Switch>
            </AcmHeader>
        </BrowserRouter>
    )
}

export default App
