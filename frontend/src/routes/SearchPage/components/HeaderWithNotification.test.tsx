// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React from 'react'
import { render } from '@testing-library/react'
import HeaderWithNotification from './HeaderWithNotification'

// case where we have a message about disabled search (current message)
test('renders clusters disabled message', () => {
    const disableSearch = [
        { id: 'S20', kind: 'info', description: 'Search is disabled on some of your managed clusters.' },
    ]
    const { baseElement } = render(<HeaderWithNotification queryMessages={disableSearch} />)
    expect(baseElement).toMatchSnapshot()
})

// case where we have no message
test('renders empty message', () => {
    const emptyMessage = [{}]
    const { baseElement } = render(<HeaderWithNotification queryMessages={emptyMessage} />)
    expect(baseElement).toMatchSnapshot()
})

// case where we have a different message
test('renders unknown message', () => {
    const newMessage = [{ id: 'S90', kind: 'warning', message: 'This is a new message' }]
    const { baseElement } = render(<HeaderWithNotification queryMessages={newMessage} />)
    expect(baseElement).toMatchSnapshot()
})
