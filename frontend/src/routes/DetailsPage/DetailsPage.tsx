import React from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import { AcmPage, AcmPageHeader, AcmSecondaryNav, AcmSecondaryNavItem } from '@open-cluster-management/ui-components'
import '@patternfly/react-core/dist/styles/base.css'
import YAMLPage from './YAMLPage'
import LogsTab from './LogsTab'

function getResourceData() {
    const baseSegments = window.location.pathname.split('/').slice(2)
    if (baseSegments[baseSegments.length - 1] === 'logs') {
        baseSegments.pop()
    }
    const selfLink = baseSegments.slice(1).join('/')
    const cluster = baseSegments[0]
    const name = baseSegments[baseSegments.length - 1]
    const kind = baseSegments[baseSegments.length - 2]
    const namespace = baseSegments[baseSegments.length - 4] === 'namespaces'
        ? baseSegments[baseSegments.length - 3]
        : ''
    return { cluster, selfLink, namespace, kind, name }
}

export default function DetailsPage() {
    const { cluster, selfLink, namespace, kind, name } = getResourceData()
    const location = useLocation()

    return (
        <AcmPage>
            <AcmPageHeader title={name} breadcrumb={[ { text: 'Search', to: '/search' } ]} />
            <AcmSecondaryNav>
                <AcmSecondaryNavItem
                    isActive={location.pathname === `/details/${cluster}/${selfLink}`} >
                    <Link to={`/details/${cluster}/${selfLink}`}>YAML</Link>
                </AcmSecondaryNavItem>
                {kind === 'pods'
                    ? <AcmSecondaryNavItem
                        isActive={location.pathname === `/details/${cluster}/${selfLink}/logs`} >
                        <Link to={`/details/${cluster}/${selfLink}/logs`}>Logs</Link>
                    </AcmSecondaryNavItem>
                    : null}
            </AcmSecondaryNav>
            <Switch>
                <Route exact path={`/details/${cluster}/${selfLink}`}>
                    <YAMLPage
                        cluster={cluster}
                        selfLink={selfLink}
                        namespace={namespace}
                        kind={kind}
                        name={name} />
                </Route>
                <Route path={`/details/${cluster}/${selfLink}/logs`} render={() => <LogsTab
                    cluster={cluster}
                    selfLink={selfLink}
                    namespace={namespace}
                    kind={kind}
                    name={name} /> } />
            </Switch>
        </AcmPage>
    )
}
