// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React from 'react'
import { render } from '@testing-library/react'
import HeaderWithNotification from './HeaderWithNotification'
import { MockedProvider } from '@apollo/client/testing'

///case where we have a message about disabled search (current message)
test('renders clusters disabled message', () => {
    const disableSearch = [
        { id: 'S20', kind: 'info', description: 'Search is disabled on some of your managed clusters.' },
    ]
    const { getByText } = render(
        <MockedProvider mocks={[]}>
            <HeaderWithNotification queryMessages={disableSearch} />
        </MockedProvider>
    )
    expect(getByText).toMatchSnapshot()
})

//case where we have no message
test('renders empty message', () => {
    const emptyMessage = [{}]
    const { getByText } = render(
        <MockedProvider mocks={[]}>
            <HeaderWithNotification queryMessages={emptyMessage} />
        </MockedProvider>
    )
    expect(getByText).toMatchSnapshot()
})

// case where we have a different message
test('renders unknown message', () => {
    const newMessage = [{ id: 'S90', kind: 'warning', message: 'This is a new message' }]
    const { getByText } = render(
        <MockedProvider mocks={[]}>
            <HeaderWithNotification queryMessages={newMessage} />
        </MockedProvider>
    )
    expect(getByText).toMatchSnapshot()
})
