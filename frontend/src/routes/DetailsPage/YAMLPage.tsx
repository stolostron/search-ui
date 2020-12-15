
import { PageSection } from '@patternfly/react-core'
import { AcmAlert, AcmLoadingPage } from '@open-cluster-management/ui-components'
import { ApolloError } from '@apollo/client'
import MonacoEditor, { monaco } from 'react-monaco-editor'
import { makeStyles } from '@material-ui/styles'
import jsYaml from 'js-yaml'
import { Query } from '../../console-sdk/console-sdk'

import 'monaco-editor/esm/vs/editor/editor.all.js'
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js'

monaco.editor.defineTheme('console', {
    base: 'vs-dark',
    inherit: true,
    rules: [
        // avoid pf tokens for `rules` since tokens are opaque strings that might not be hex values
        { token: 'number', foreground: 'ace12e' },
        { token: 'type', foreground: '73bcf7' },
        { token: 'string', foreground: 'f0ab00' },
        { token: 'keyword', foreground: 'cbc0ff' }
    ],
    colors: {
        'editorGutter.background': '#292e34', // no pf token defined
    }
})
monaco.editor.setTheme('console')

const useStyles = makeStyles({
    headerContainer: {
        display: 'flex',
        backgroundColor: '#212427',
        fontSize: '14px',
    },
    spacer: {
        borderRight: '1px solid #4f5255',
        paddingLeft: '1rem',
    },
    textTitle: {
        color: '#d2d2d2',
        padding: '1rem',
    },
    textContent: {
        color: '#FFF',
        padding: '1rem 0',
        fontWeight: 700,
    }
})

export default function YAMLPage(props: {
    resource: Pick<Query, 'getResource'> | undefined,
    loading: boolean,
    error: ApolloError | undefined,
    name: string,
    cluster: string,
    namespace: string,
}) {
    const { resource, loading, error, name, namespace, cluster } = props
    const classes = useStyles()

    const editorOptions = {
        colorDecorators: true,
        readOnly: true,
        fontSize: 14,
        wordWrapMinified: false,
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        glyphMargin: true,
        tabSize: 2,
        scrollbar: {
            verticalScrollbarSize: 17,
            horizontalScrollbarSize: 17
        }
    }

    if (error) {
        return (
            <PageSection>
                <AcmAlert
                    noClose={true}
                    variant={'danger'}
                    isInline={true}
                    title={`Error querying for resource: ${name}`}
                    subtitle={error.message} />
            </PageSection>
        )
    }
    if (loading) {
        return (
            <PageSection>
                <AcmLoadingPage />
            </PageSection>
        )
    }

    return (
        <PageSection>
            <div className={classes.headerContainer}>
                <p className={classes.textTitle}>{'Cluster:'}</p>
                <p className={classes.textContent}>{cluster}</p>
                <div className={classes.spacer}/>
                <p className={classes.textTitle}>{'Namespace:'}</p>
                <p className={classes.textContent}>{namespace}</p>
            </div>
            <MonacoEditor
                theme={'console'}
                width={'100%'}
                height={'90%'}
                value={jsYaml.safeDump(resource?.getResource, { indent: 2 })}
                onChange={() => {}}
                language={'yaml'}
                options={editorOptions} />
        </PageSection>
    )
}