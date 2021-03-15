// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import { ApolloClient, InMemoryCache } from '@apollo/client'
import getCsrfToken from '../lib/csrf-helper'

export const consoleClient = new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    uri: `/search/console-api/graphql`,
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
