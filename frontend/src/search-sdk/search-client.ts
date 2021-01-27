import { ApolloClient, InMemoryCache } from '@apollo/client'

const getXsrfToken = () => {
    const token = (document!.head!.querySelector('meta[property=csrf-token]')! as HTMLMetaElement).content || ''
    // const token = document.getElementById('app-access')?.value || '' // ? document.getElementById('app-access').value : ''
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
