import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import LogsPage from './LogsPage'
import { GetLogsDocument } from '../../console-sdk/console-sdk'

async function wait(ms = 0) {
    await act(() => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    })
}

it('should render logs page loading state', async () => {
    const mocks = [
        {
            request: {
                query: GetLogsDocument,
                variables: {
                    containerName: 'testContainer',
                    podName: 'testName',
                    podNamespace: 'testNamespace',
                    clusterName: 'testCluster',
                },
            },
            result: {
                data: {
                    logs: 'testLogs',
                },
                errors: [],
            },
        },
    ]

    render(
        <MockedProvider mocks={mocks}>
            <LogsPage
                containers={['testContainer']}
                cluster={'testCluster'}
                namespace={'testNamespace'}
                name={'testName'}
            />
        </MockedProvider>
    )
    // Test the loading state while apollo query finishes
    expect(screen.getByText('Loading')).toBeInTheDocument()
    // This wait pauses till apollo query is returning data
    await wait(1)
    // Test that the component has rendered correctly with data
    expect(screen.getByText('testLogs')).toBeInTheDocument()
})
