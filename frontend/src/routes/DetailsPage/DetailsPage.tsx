// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import { useEffect } from 'react'
import { Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import {
    AcmButton,
    AcmPage,
    AcmPageHeader,
    AcmRoute,
    AcmSecondaryNav,
    AcmSecondaryNavItem,
} from '@open-cluster-management/ui-components'
import '@patternfly/react-core/dist/styles/base.css'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { acmRouteState } from '../../util'
import YAMLPage from './YAMLPage'
import LogsPage from './LogsPage'
import { consoleClient } from '../../console-sdk/console-client'
import { useGetResourceQuery } from '../../console-sdk/console-sdk'

const useStyles = makeStyles({
    customBreadcrumb: {
        padding: '8px 0 0 8px',
        marginBottom: '-20px',
        backgroundColor: 'var(--pf-global--palette--white)',
    },
})

function getResourceData() {
    let cluster = '',
        kind = '',
        apiversion = '',
        namespace = '',
        name = ''
    const urlParams = decodeURIComponent(window.location.search).replace('?', '').split('&')
    urlParams.forEach((param) => {
        const paramKey = param.split('=')[0]
        const paramValue = param.split('=')[1]
        switch (paramKey) {
            case 'cluster':
                cluster = paramValue
                break
            case 'kind':
                kind = paramValue
                break
            case 'apiversion':
                apiversion = paramValue
                break
            case 'namespace':
                namespace = paramValue
                break
            case 'name':
                name = paramValue
                break
        }
    })
    return { cluster, kind, apiversion, namespace, name }
}

export default function DetailsPage() {
    const { t } = useTranslation(['details'])
    const [, setRoute] = useRecoilState(acmRouteState)
    useEffect(() => setRoute(AcmRoute.Resources), [setRoute])
    const { cluster, kind, apiversion, namespace, name } = getResourceData()
    let resourceUrlParams = ''
    resourceUrlParams = `${resourceUrlParams}${cluster !== '' ? `cluster=${cluster}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${kind !== '' ? `&kind=${kind}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${apiversion !== '' ? `&apiversion=${apiversion}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${namespace !== '' ? `&namespace=${namespace}` : ''}`
    resourceUrlParams = `${resourceUrlParams}${name !== '' ? `&name=${name}` : ''}`
    const classes = useStyles()
    const getResourceResponse = useGetResourceQuery({
        client: consoleClient,
        variables: {
            apiVersion: apiversion,
            kind,
            name,
            namespace,
            cluster,
        },
    })
    const location = useLocation()
    const history = useHistory()

    return (
        <AcmPage>
            <div className={classes.customBreadcrumb}>
                <AcmButton
                    variant={'link'}
                    onClick={() => {
                        const prevLocState = window.history?.state?.state
                        if (prevLocState && prevLocState.from === '/search') {
                            // If we came to resources page from search - return to search with previous search filters
                            history.goBack()
                        } else {
                            // If we were redirected to search from elsewhere (ex: application page) - go to blank search page
                            window.location.href = '/search'
                        }
                    }}
                >
                    {t('details.breadcrumb.search')}
                </AcmButton>
            </div>
            <AcmPageHeader
                title={name}
                navigation={
                    <AcmSecondaryNav>
                        <AcmSecondaryNavItem isActive={location.pathname === '/resources'}>
                            <Link replace to={`/resources?${encodeURIComponent(resourceUrlParams)}`}>
                                YAML
                            </Link>
                        </AcmSecondaryNavItem>
                        {(kind.toLowerCase() === 'pod' || kind.toLowerCase() === 'pods') && (
                            <AcmSecondaryNavItem isActive={location.pathname === '/resources/logs'}>
                                <Link replace to={`/resources/logs?${encodeURIComponent(resourceUrlParams)}`}>
                                    Logs
                                </Link>
                            </AcmSecondaryNavItem>
                        )}
                    </AcmSecondaryNav>
                }
            />
            <Switch>
                <Route exact path={'/resources'}>
                    <YAMLPage
                        resource={getResourceResponse.data}
                        loading={getResourceResponse.loading}
                        error={getResourceResponse.error}
                        name={name}
                        namespace={namespace}
                        cluster={cluster}
                        kind={kind}
                        apiversion={apiversion}
                    />
                </Route>
                {(kind.toLowerCase() === 'pod' || kind.toLowerCase() === 'pods') && (
                    <Route path={'/resources/logs'}>
                        <LogsPage
                            containers={_.get(getResourceResponse, 'data.getResource.spec.containers', []).map(
                                (container: any) => container.name
                            )}
                            cluster={cluster}
                            namespace={namespace}
                            name={name}
                        />
                    </Route>
                )}
            </Switch>
        </AcmPage>
    )
}
