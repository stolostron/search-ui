import { ApolloClient, InMemoryCache } from "@apollo/client"

export const searchClient = new ApolloClient({
    uri: `${process.env.REACT_APP_SEARCH_API_URL}/graphql`,
    cache: new InMemoryCache(),
    credentials: 'same-origin',
})
