import { AcmPage } from '@open-cluster-management/ui-components'
import { consoleClient } from '../../console-sdk/console-client'
import { useGetResourceQuery } from '../../console-sdk/console-sdk'

export default function YAMLPage(props: {  cluster: string, selfLink: string, namespace: string, kind: string, name: string }) {
    const { cluster, selfLink, namespace, kind, name } = props
    return (
        <AcmPage>
            <div>{'LOGSTAB'}</div>
        </AcmPage>
    )
}