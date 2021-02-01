// Copyright (c) 2021 Red Hat, Inc.

import { ApolloClient, InMemoryCache } from '@apollo/client'
import getCsrfToken from '../lib/csrf-helper'

export const searchClient = new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    uri: 'searchapi/graphql',
    cache: new InMemoryCache(),
    credentials: 'same-origin',
    headers: {
        'csrf-token': getCsrfToken(),
    },
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
})
