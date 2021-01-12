/* istanbul ignore file */

import '@patternfly/react-core/dist/styles/base.css'
import { lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './lib/i18n'

const SearchPage = lazy(() => import('./routes/SearchPage/SearchPage'))
const DetailsPage = lazy(() => import('./routes/DetailsPage/DetailsPage'))
const OverviewPage = lazy(() => import('./routes/Overview/OverviewPage'))

function App() {
    return (
        // <ApolloProvider client={consoleClient}>
        <Router>
            <Switch>
                {/* New UI Paths */}
                <Route path={'/overview'} component={OverviewPage} />
                <Route exact path={'/search'} component={SearchPage} />
                <Route path={'/resources'} component={DetailsPage} />

                {/* Old UI Redirects */}
                <Redirect from={'/multicloud/overview'} to={'/overview'} />
                <Redirect from={'/multicloud/search'} to={{ pathname: '/search', search: window.location.search }} />
                <Redirect
                    from={'/multicloud/details'}
                    to={{ pathname: window.location.pathname.replace('/multicloud/details', '/resources') }}
                />

                {/* Redirect to base search page on all other paths */}
                <Route exact path="*">
                    <Redirect to={'/search'} />
                </Route>
            </Switch>
        </Router>
        // </ApolloProvider>
    )
}

export default App
