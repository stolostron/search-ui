import { ApolloClient, InMemoryCache } from '@apollo/client'

const getXsrfToken = () => {
    const metaTag = document!.body!.querySelector('meta[name=csrf-token]')! as HTMLMetaElement
    const token = (metaTag || {}).content || ''
    return token.toString()
}

export const searchClient = new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    uri: 'searchapi/graphql',
    cache: new InMemoryCache(),
    credentials: 'same-origin',
    headers: {
        'csrf-token': getXsrfToken(),
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
