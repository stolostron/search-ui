/* istanbul ignore file */

import "@patternfly/react-core/dist/styles/base.css";
import { lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

const SearchPage = lazy(() => import('./routes/SearchPage/SearchPage'))
const DetailsPage = lazy(() => import('./routes/DetailsPage/DetailsPage'))

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={'/search'} component={SearchPage} />
                <Route path={'/details'} component={DetailsPage} />
                <Route exact path="*">
                    <Redirect to={'/search'} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
