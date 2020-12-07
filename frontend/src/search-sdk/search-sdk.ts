import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any
    /** The `Upload` scalar type represents a file upload. */
    Upload: any
}

export type Application = {
    _uid?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    dashboard?: Maybe<Scalars['String']>
    labels?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    clusterCount?: Maybe<Scalars['JSON']>
    hubChannels?: Maybe<Array<Maybe<Scalars['JSON']>>>
    hubSubscriptions?: Maybe<Array<Maybe<Subscription>>>
    podStatusCount?: Maybe<Scalars['JSON']>
    remoteSubscriptionStatusCount?: Maybe<Scalars['JSON']>
}

export type Subscription = {
    _uid?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    channel?: Maybe<Scalars['String']>
    appCount?: Maybe<Scalars['Int']>
    clusterCount?: Maybe<Scalars['JSON']>
    timeWindow?: Maybe<Scalars['String']>
    localPlacement?: Maybe<Scalars['Boolean']>
    status?: Maybe<Scalars['String']>
}

export type PlacementRule = {
    _uid?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    clusterCount?: Maybe<Scalars['JSON']>
    replicas?: Maybe<Scalars['Int']>
}

export type Channel = {
    _uid?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    pathname?: Maybe<Scalars['String']>
    localPlacement?: Maybe<Scalars['Boolean']>
    subscriptionCount?: Maybe<Scalars['Int']>
    clusterCount?: Maybe<Scalars['JSON']>
}

export type GlobalAppData = {
    channelsCount?: Maybe<Scalars['Int']>
    clusterCount?: Maybe<Scalars['Int']>
    hubSubscriptionCount?: Maybe<Scalars['Int']>
    remoteSubscriptionStatusCount?: Maybe<Scalars['JSON']>
}

export type Query = {
    applications?: Maybe<Array<Maybe<Application>>>
    subscriptions?: Maybe<Array<Maybe<Subscription>>>
    placementRules?: Maybe<Array<Maybe<PlacementRule>>>
    channels?: Maybe<Array<Maybe<Channel>>>
    globalAppData?: Maybe<GlobalAppData>
    search?: Maybe<Array<Maybe<SearchResult>>>
    searchComplete?: Maybe<Array<Maybe<Scalars['String']>>>
    searchSchema?: Maybe<Scalars['JSON']>
    savedSearches?: Maybe<Array<Maybe<UserSearch>>>
}

export type QueryApplicationsArgs = {
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
}

export type QuerySubscriptionsArgs = {
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
}

export type QueryPlacementRulesArgs = {
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
}

export type QueryChannelsArgs = {
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
}

export type QuerySearchArgs = {
    input?: Maybe<Array<Maybe<SearchInput>>>
}

export type QuerySearchCompleteArgs = {
    property: Scalars['String']
    query?: Maybe<SearchInput>
    limit?: Maybe<Scalars['Int']>
}

export type Mutation = {
    deleteSearch?: Maybe<Scalars['JSON']>
    saveSearch?: Maybe<Scalars['JSON']>
}

export type MutationDeleteSearchArgs = {
    resource?: Maybe<Scalars['JSON']>
}

export type MutationSaveSearchArgs = {
    resource?: Maybe<Scalars['JSON']>
}

export type SearchFilter = {
    property: Scalars['String']
    values?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SearchInput = {
    keywords?: Maybe<Array<Maybe<Scalars['String']>>>
    filters?: Maybe<Array<Maybe<SearchFilter>>>
    limit?: Maybe<Scalars['Int']>
    relatedKinds?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SearchResult = {
    count?: Maybe<Scalars['Int']>
    items?: Maybe<Scalars['JSON']>
    related?: Maybe<Array<Maybe<SearchRelatedResult>>>
}

export type SearchRelatedResult = {
    kind: Scalars['String']
    count?: Maybe<Scalars['Int']>
    items?: Maybe<Scalars['JSON']>
}

export type UserSearch = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    searchText?: Maybe<Scalars['String']>
}

export enum CacheControlScope {
    Public = 'PUBLIC',
    Private = 'PRIVATE',
}

export type SaveSearchMutationVariables = Exact<{
    resource: Scalars['JSON']
}>

export type SaveSearchMutation = Pick<Mutation, 'saveSearch'>

export type DeleteSearchMutationVariables = Exact<{
    resource: Scalars['JSON']
}>

export type DeleteSearchMutation = Pick<Mutation, 'deleteSearch'>

export type SavedSearchesQueryVariables = Exact<{ [key: string]: never }>

export type SavedSearchesQuery = {
    items?: Maybe<Array<Maybe<Pick<UserSearch, 'id' | 'name' | 'description' | 'searchText'>>>>
}

export type SearchSchemaQueryVariables = Exact<{ [key: string]: never }>

export type SearchSchemaQuery = Pick<Query, 'searchSchema'>

export type SearchCompleteQueryVariables = Exact<{
    property: Scalars['String']
    query?: Maybe<SearchInput>
    limit?: Maybe<Scalars['Int']>
}>

export type SearchCompleteQuery = Pick<Query, 'searchComplete'>

export type SearchResultItemsQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>>>
}>

export type SearchResultItemsQuery = { searchResult?: Maybe<Array<Maybe<Pick<SearchResult, 'items'>>>> }

export type SearchResultCountQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>>>
}>

export type SearchResultCountQuery = { searchResult?: Maybe<Array<Maybe<Pick<SearchResult, 'count'>>>> }

export type SearchResultCountAndRelatedCountQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>>>
}>

export type SearchResultCountAndRelatedCountQuery = {
    searchResult?: Maybe<
        Array<
            Maybe<
                Pick<SearchResult, 'count'> & {
                    related?: Maybe<Array<Maybe<Pick<SearchRelatedResult, 'kind' | 'count'>>>>
                }
            >
        >
    >
}

export type SearchResultRelatedCountQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>>>
}>

export type SearchResultRelatedCountQuery = {
    searchResult?: Maybe<Array<Maybe<{ related?: Maybe<Array<Maybe<Pick<SearchRelatedResult, 'kind' | 'count'>>>> }>>>
}

export type SearchResultRelatedItemsQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>>>
}>

export type SearchResultRelatedItemsQuery = {
    searchResult?: Maybe<Array<Maybe<{ related?: Maybe<Array<Maybe<Pick<SearchRelatedResult, 'kind' | 'items'>>>> }>>>
}

export const SaveSearchDocument = gql`
    mutation saveSearch($resource: JSON!) {
        saveSearch(resource: $resource)
    }
`
export type SaveSearchMutationFn = Apollo.MutationFunction<SaveSearchMutation, SaveSearchMutationVariables>

/**
 * __useSaveSearchMutation__
 *
 * To run a mutation, you first call `useSaveSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSearchMutation, { data, loading, error }] = useSaveSearchMutation({
 *   variables: {
 *      resource: // value for 'resource'
 *   },
 * });
 */
export function useSaveSearchMutation(
    baseOptions?: Apollo.MutationHookOptions<SaveSearchMutation, SaveSearchMutationVariables>
) {
    return Apollo.useMutation<SaveSearchMutation, SaveSearchMutationVariables>(SaveSearchDocument, baseOptions)
}
export type SaveSearchMutationHookResult = ReturnType<typeof useSaveSearchMutation>
export type SaveSearchMutationResult = Apollo.MutationResult<SaveSearchMutation>
export type SaveSearchMutationOptions = Apollo.BaseMutationOptions<SaveSearchMutation, SaveSearchMutationVariables>
export const DeleteSearchDocument = gql`
    mutation deleteSearch($resource: JSON!) {
        deleteSearch(resource: $resource)
    }
`
export type DeleteSearchMutationFn = Apollo.MutationFunction<DeleteSearchMutation, DeleteSearchMutationVariables>

/**
 * __useDeleteSearchMutation__
 *
 * To run a mutation, you first call `useDeleteSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSearchMutation, { data, loading, error }] = useDeleteSearchMutation({
 *   variables: {
 *      resource: // value for 'resource'
 *   },
 * });
 */
export function useDeleteSearchMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteSearchMutation, DeleteSearchMutationVariables>
) {
    return Apollo.useMutation<DeleteSearchMutation, DeleteSearchMutationVariables>(DeleteSearchDocument, baseOptions)
}
export type DeleteSearchMutationHookResult = ReturnType<typeof useDeleteSearchMutation>
export type DeleteSearchMutationResult = Apollo.MutationResult<DeleteSearchMutation>
export type DeleteSearchMutationOptions = Apollo.BaseMutationOptions<
    DeleteSearchMutation,
    DeleteSearchMutationVariables
>
export const SavedSearchesDocument = gql`
    query savedSearches {
        items: savedSearches {
            id
            name
            description
            searchText
        }
    }
`

/**
 * __useSavedSearchesQuery__
 *
 * To run a query within a React component, call `useSavedSearchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSavedSearchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSavedSearchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSavedSearchesQuery(
    baseOptions?: Apollo.QueryHookOptions<SavedSearchesQuery, SavedSearchesQueryVariables>
) {
    return Apollo.useQuery<SavedSearchesQuery, SavedSearchesQueryVariables>(SavedSearchesDocument, baseOptions)
}
export function useSavedSearchesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SavedSearchesQuery, SavedSearchesQueryVariables>
) {
    return Apollo.useLazyQuery<SavedSearchesQuery, SavedSearchesQueryVariables>(SavedSearchesDocument, baseOptions)
}
export type SavedSearchesQueryHookResult = ReturnType<typeof useSavedSearchesQuery>
export type SavedSearchesLazyQueryHookResult = ReturnType<typeof useSavedSearchesLazyQuery>
export type SavedSearchesQueryResult = Apollo.QueryResult<SavedSearchesQuery, SavedSearchesQueryVariables>
export const SearchSchemaDocument = gql`
    query searchSchema {
        searchSchema
    }
`

/**
 * __useSearchSchemaQuery__
 *
 * To run a query within a React component, call `useSearchSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSchemaQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchSchemaQuery(
    baseOptions?: Apollo.QueryHookOptions<SearchSchemaQuery, SearchSchemaQueryVariables>
) {
    return Apollo.useQuery<SearchSchemaQuery, SearchSchemaQueryVariables>(SearchSchemaDocument, baseOptions)
}
export function useSearchSchemaLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchSchemaQuery, SearchSchemaQueryVariables>
) {
    return Apollo.useLazyQuery<SearchSchemaQuery, SearchSchemaQueryVariables>(SearchSchemaDocument, baseOptions)
}
export type SearchSchemaQueryHookResult = ReturnType<typeof useSearchSchemaQuery>
export type SearchSchemaLazyQueryHookResult = ReturnType<typeof useSearchSchemaLazyQuery>
export type SearchSchemaQueryResult = Apollo.QueryResult<SearchSchemaQuery, SearchSchemaQueryVariables>
export const SearchCompleteDocument = gql`
    query searchComplete($property: String!, $query: SearchInput, $limit: Int) {
        searchComplete(property: $property, query: $query, limit: $limit)
    }
`

/**
 * __useSearchCompleteQuery__
 *
 * To run a query within a React component, call `useSearchCompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCompleteQuery({
 *   variables: {
 *      property: // value for 'property'
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchCompleteQuery(
    baseOptions?: Apollo.QueryHookOptions<SearchCompleteQuery, SearchCompleteQueryVariables>
) {
    return Apollo.useQuery<SearchCompleteQuery, SearchCompleteQueryVariables>(SearchCompleteDocument, baseOptions)
}
export function useSearchCompleteLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchCompleteQuery, SearchCompleteQueryVariables>
) {
    return Apollo.useLazyQuery<SearchCompleteQuery, SearchCompleteQueryVariables>(SearchCompleteDocument, baseOptions)
}
export type SearchCompleteQueryHookResult = ReturnType<typeof useSearchCompleteQuery>
export type SearchCompleteLazyQueryHookResult = ReturnType<typeof useSearchCompleteLazyQuery>
export type SearchCompleteQueryResult = Apollo.QueryResult<SearchCompleteQuery, SearchCompleteQueryVariables>
export const SearchResultItemsDocument = gql`
    query searchResultItems($input: [SearchInput]) {
        searchResult: search(input: $input) {
            items
        }
    }
`

/**
 * __useSearchResultItemsQuery__
 *
 * To run a query within a React component, call `useSearchResultItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResultItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResultItemsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchResultItemsQuery(
    baseOptions?: Apollo.QueryHookOptions<SearchResultItemsQuery, SearchResultItemsQueryVariables>
) {
    return Apollo.useQuery<SearchResultItemsQuery, SearchResultItemsQueryVariables>(
        SearchResultItemsDocument,
        baseOptions
    )
}
export function useSearchResultItemsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultItemsQuery, SearchResultItemsQueryVariables>
) {
    return Apollo.useLazyQuery<SearchResultItemsQuery, SearchResultItemsQueryVariables>(
        SearchResultItemsDocument,
        baseOptions
    )
}
export type SearchResultItemsQueryHookResult = ReturnType<typeof useSearchResultItemsQuery>
export type SearchResultItemsLazyQueryHookResult = ReturnType<typeof useSearchResultItemsLazyQuery>
export type SearchResultItemsQueryResult = Apollo.QueryResult<SearchResultItemsQuery, SearchResultItemsQueryVariables>
export const SearchResultCountDocument = gql`
    query searchResultCount($input: [SearchInput]) {
        searchResult: search(input: $input) {
            count
        }
    }
`

/**
 * __useSearchResultCountQuery__
 *
 * To run a query within a React component, call `useSearchResultCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResultCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResultCountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchResultCountQuery(
    baseOptions?: Apollo.QueryHookOptions<SearchResultCountQuery, SearchResultCountQueryVariables>
) {
    return Apollo.useQuery<SearchResultCountQuery, SearchResultCountQueryVariables>(
        SearchResultCountDocument,
        baseOptions
    )
}
export function useSearchResultCountLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultCountQuery, SearchResultCountQueryVariables>
) {
    return Apollo.useLazyQuery<SearchResultCountQuery, SearchResultCountQueryVariables>(
        SearchResultCountDocument,
        baseOptions
    )
}
export type SearchResultCountQueryHookResult = ReturnType<typeof useSearchResultCountQuery>
export type SearchResultCountLazyQueryHookResult = ReturnType<typeof useSearchResultCountLazyQuery>
export type SearchResultCountQueryResult = Apollo.QueryResult<SearchResultCountQuery, SearchResultCountQueryVariables>
export const SearchResultCountAndRelatedCountDocument = gql`
    query searchResultCountAndRelatedCount($input: [SearchInput]) {
        searchResult: search(input: $input) {
            count
            related {
                kind
                count
            }
        }
    }
`

/**
 * __useSearchResultCountAndRelatedCountQuery__
 *
 * To run a query within a React component, call `useSearchResultCountAndRelatedCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResultCountAndRelatedCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResultCountAndRelatedCountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchResultCountAndRelatedCountQuery(
    baseOptions?: Apollo.QueryHookOptions<
        SearchResultCountAndRelatedCountQuery,
        SearchResultCountAndRelatedCountQueryVariables
    >
) {
    return Apollo.useQuery<SearchResultCountAndRelatedCountQuery, SearchResultCountAndRelatedCountQueryVariables>(
        SearchResultCountAndRelatedCountDocument,
        baseOptions
    )
}
export function useSearchResultCountAndRelatedCountLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        SearchResultCountAndRelatedCountQuery,
        SearchResultCountAndRelatedCountQueryVariables
    >
) {
    return Apollo.useLazyQuery<SearchResultCountAndRelatedCountQuery, SearchResultCountAndRelatedCountQueryVariables>(
        SearchResultCountAndRelatedCountDocument,
        baseOptions
    )
}
export type SearchResultCountAndRelatedCountQueryHookResult = ReturnType<
    typeof useSearchResultCountAndRelatedCountQuery
>
export type SearchResultCountAndRelatedCountLazyQueryHookResult = ReturnType<
    typeof useSearchResultCountAndRelatedCountLazyQuery
>
export type SearchResultCountAndRelatedCountQueryResult = Apollo.QueryResult<
    SearchResultCountAndRelatedCountQuery,
    SearchResultCountAndRelatedCountQueryVariables
>
export const SearchResultRelatedCountDocument = gql`
    query searchResultRelatedCount($input: [SearchInput]) {
        searchResult: search(input: $input) {
            related {
                kind
                count
            }
        }
    }
`

/**
 * __useSearchResultRelatedCountQuery__
 *
 * To run a query within a React component, call `useSearchResultRelatedCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResultRelatedCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResultRelatedCountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchResultRelatedCountQuery(
    baseOptions?: Apollo.QueryHookOptions<SearchResultRelatedCountQuery, SearchResultRelatedCountQueryVariables>
) {
    return Apollo.useQuery<SearchResultRelatedCountQuery, SearchResultRelatedCountQueryVariables>(
        SearchResultRelatedCountDocument,
        baseOptions
    )
}
export function useSearchResultRelatedCountLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultRelatedCountQuery, SearchResultRelatedCountQueryVariables>
) {
    return Apollo.useLazyQuery<SearchResultRelatedCountQuery, SearchResultRelatedCountQueryVariables>(
        SearchResultRelatedCountDocument,
        baseOptions
    )
}
export type SearchResultRelatedCountQueryHookResult = ReturnType<typeof useSearchResultRelatedCountQuery>
export type SearchResultRelatedCountLazyQueryHookResult = ReturnType<typeof useSearchResultRelatedCountLazyQuery>
export type SearchResultRelatedCountQueryResult = Apollo.QueryResult<
    SearchResultRelatedCountQuery,
    SearchResultRelatedCountQueryVariables
>
export const SearchResultRelatedItemsDocument = gql`
    query searchResultRelatedItems($input: [SearchInput]) {
        searchResult: search(input: $input) {
            related {
                kind
                items
            }
        }
    }
`

/**
 * __useSearchResultRelatedItemsQuery__
 *
 * To run a query within a React component, call `useSearchResultRelatedItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchResultRelatedItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchResultRelatedItemsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchResultRelatedItemsQuery(
    baseOptions?: Apollo.QueryHookOptions<SearchResultRelatedItemsQuery, SearchResultRelatedItemsQueryVariables>
) {
    return Apollo.useQuery<SearchResultRelatedItemsQuery, SearchResultRelatedItemsQueryVariables>(
        SearchResultRelatedItemsDocument,
        baseOptions
    )
}
export function useSearchResultRelatedItemsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultRelatedItemsQuery, SearchResultRelatedItemsQueryVariables>
) {
    return Apollo.useLazyQuery<SearchResultRelatedItemsQuery, SearchResultRelatedItemsQueryVariables>(
        SearchResultRelatedItemsDocument,
        baseOptions
    )
}
export type SearchResultRelatedItemsQueryHookResult = ReturnType<typeof useSearchResultRelatedItemsQuery>
export type SearchResultRelatedItemsLazyQueryHookResult = ReturnType<typeof useSearchResultRelatedItemsLazyQuery>
export type SearchResultRelatedItemsQueryResult = Apollo.QueryResult<
    SearchResultRelatedItemsQuery,
    SearchResultRelatedItemsQueryVariables
>