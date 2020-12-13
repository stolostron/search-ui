import { AcmPage } from '@open-cluster-management/ui-components'
import { consoleClient } from '../../console-sdk/console-client'
import { useGetResourceQuery } from '../../console-sdk/console-sdk'

export default function YAMLPage(props: { cluster: string, selfLink: string, namespace: string, kind: string, name: string }) {
    const { cluster, selfLink, namespace, kind, name } = props
    const { data, loading, error } = useGetResourceQuery({
        client: consoleClient,
        variables: {
            kind,
            name,
            namespace,
            cluster,
            selfLink,
        },
    });
        
    if (error) {
        // TODO
        console.error(error)
    }
    if (loading) {
        console.log('loading resource data')
    }
    console.log(data)
    return (
        <AcmPage>
            <div>{'YAML PAGE'}</div>
        </AcmPage>
    )
}