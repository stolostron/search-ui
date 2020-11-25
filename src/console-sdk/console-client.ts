import { ApolloClient, InMemoryCache } from '@apollo/client'

export const consoleClient = new ApolloClient({
    uri: `${process.env.REACT_APP_CONSOLE_API}/graphql`,
    cache: new InMemoryCache(),
    credentials: 'include',
})
