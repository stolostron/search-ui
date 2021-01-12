import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { GraphQLError } from 'graphql'
import LogsPage from './LogsPage'
import { GetLogsDocument } from '../../console-sdk/console-sdk'

async function wait(ms = 0) {
    await act(() => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    })
}

it('should render logs page with data and successfully switch containers', async () => {
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
            },
        },
        {
            request: {
                query: GetLogsDocument,
                variables: {
                    containerName: 'testContainer1',
                    podName: 'testName',
                    podNamespace: 'testNamespace',
                    clusterName: 'testCluster',
                },
            },
            result: {
                data: {
                    logs: 'testLogs1',
                },
            },
        },
    ]

    render(
        <MockedProvider mocks={mocks}>
            <LogsPage
                containers={['testContainer', 'testContainer1']}
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

    // Find and click container dropdown
    const switchContainersButtons = screen.getAllByRole('button')
    expect(switchContainersButtons).toBeTruthy()
    userEvent.click(switchContainersButtons[1])

    // Find an click the other container item
    const containerItemButtons = screen.getAllByRole('option')
    expect(containerItemButtons).toBeTruthy()
    userEvent.click(containerItemButtons[1])

    // This wait pauses till apollo query is returning data
    await wait(1)
    // Test that the component has rendered correctly with data
    expect(screen.getByText('testLogs1')).toBeInTheDocument()
})

it('should render logs page in error state', async () => {
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
                errors: [new GraphQLError('Error getting the logs')],
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
    // Test that the component has rendered correctly with an error
    await waitFor(() => expect(screen.queryByText('Error getting the logs')).toBeTruthy())
})
