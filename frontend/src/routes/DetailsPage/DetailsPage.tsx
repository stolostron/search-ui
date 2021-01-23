import React from 'react'
import { Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import {
    AcmButton,
    AcmPage,
    AcmPageHeader,
    AcmSecondaryNav,
    AcmSecondaryNavItem,
} from '@open-cluster-management/ui-components'
import '@patternfly/react-core/dist/styles/base.css'
import { makeStyles } from '@material-ui/styles'
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
    const urlParams = window.location.search.replace('?', '').split('&')
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
    const { cluster, kind, apiversion, namespace, name } = getResourceData()
    let resourceUrlParams = '?'
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
                <AcmButton variant={'link'} onClick={() => history.goBack()}>
                    Search
                </AcmButton>
            </div>
            <AcmPageHeader
                title={name}
                navigation={
                    <AcmSecondaryNav>
                        <AcmSecondaryNavItem isActive={location.pathname === '/resources'}>
                            <Link replace to={`/resources${resourceUrlParams}`}>
                                YAML
                            </Link>
                        </AcmSecondaryNavItem>
                        {(kind.toLowerCase() === 'pod' || kind.toLowerCase() === 'pods') && (
                            <AcmSecondaryNavItem isActive={location.pathname === '/resources/logs'}>
                                <Link replace to={`/resources/logs${resourceUrlParams}`}>
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
