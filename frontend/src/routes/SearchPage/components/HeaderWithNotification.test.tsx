// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React from 'react'
import { render } from '@testing-library/react'
import HeaderWithNotification from './HeaderWithNotification'



///case where we have a message about disabled search (current message)
test('renders clusters disabled message', () => {
    const { getByText } = render(<HeaderWithNotification showMessages={[{id: 'S20', kind: 'info', description: 'Search is disabled on some of your managed clusters.'}]} />)
    // expect(getByText(`Search is disabled on some of your managed clusters.`)).toBeInTheDocument()
    expect(getByText).toMatchSnapshot();
})


//case where we have no message
test('renders empty message', () => {
    const { getByText } = render(<HeaderWithNotification showMessages={[]} />)
    expect(getByText).toMatchSnapshot();
})


// case where we have a different message
test('renders unknown message', () => {
    const { getByText } = render(<HeaderWithNotification showMessages={[{id: 'S99', kind:'warning', message:'This is a new warning'}]} />)
    // expect(getByText(`This is a new warning`)).toBeInTheDocument()
   expect(getByText).toMatchSnapshot();
})



