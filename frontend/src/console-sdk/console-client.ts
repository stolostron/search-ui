import { ApolloClient, InMemoryCache } from '@apollo/client'

export const consoleClient = new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    uri: 'http://localhost:3000/hcmuiapi/graphql',
    cache: new InMemoryCache(),
    credentials: 'same-origin',
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
