import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const searchClient = new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    link: new HttpLink({
        uri: 'searchapi/graphql',
    }),
    cache: new InMemoryCache(),
    credentials: 'same-origin',
    defaultOptions: {
        watchQuery: {
            // fetchPolicy: defaults to 'cache-first'
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
