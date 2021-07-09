import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
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
    apiVersion?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    dashboard?: Maybe<Scalars['String']>
    labels?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    cluster?: Maybe<Scalars['String']>
    clusterCount?: Maybe<Scalars['JSON']>
    hubChannels?: Maybe<Array<Maybe<Scalars['JSON']>>>
    hubSubscriptions?: Maybe<Array<Maybe<Subscription>>>
    applicationSet?: Maybe<Scalars['String']>
    destinationName?: Maybe<Scalars['String']>
    destinationServer?: Maybe<Scalars['String']>
    destinationCluster?: Maybe<Scalars['String']>
    destinationNamespace?: Maybe<Scalars['String']>
    repoURL?: Maybe<Scalars['String']>
    path?: Maybe<Scalars['String']>
    chart?: Maybe<Scalars['String']>
    targetRevision?: Maybe<Scalars['String']>
}

export type ApplicationOverview = K8sObject & {
    metadata?: Maybe<Metadata>
    raw?: Maybe<Scalars['JSON']>
    selector?: Maybe<Scalars['JSON']>
}

export enum CacheControlScope {
    Public = 'PUBLIC',
    Private = 'PRIVATE',
}

export type Channel = {
    _uid?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    pathname?: Maybe<Scalars['String']>
    localPlacement?: Maybe<Scalars['Boolean']>
    subscriptionCount?: Maybe<Scalars['Int']>
    clusterCount?: Maybe<Scalars['JSON']>
}

export type ClusterAllocatable = {
    cpu?: Maybe<Scalars['String']>
    memory?: Maybe<Scalars['String']>
}

export type ClusterCapacity = {
    cpu?: Maybe<Scalars['String']>
    memory?: Maybe<Scalars['String']>
}

export type ClusterOverview = K8sObject & {
    metadata?: Maybe<Metadata>
    capacity?: Maybe<ClusterCapacity>
    allocatable?: Maybe<ClusterAllocatable>
    consoleURL?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
}

export type ComplianceOverview = K8sObject & {
    metadata?: Maybe<Metadata>
    raw?: Maybe<Scalars['JSON']>
}

export type K8sObject = {
    metadata?: Maybe<Metadata>
}

export type Message = {
    id: Scalars['String']
    kind?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type Metadata = {
    annotations?: Maybe<Scalars['JSON']>
    creationTimestamp?: Maybe<Scalars['String']>
    labels?: Maybe<Scalars['JSON']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    resourceVersion?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    uid?: Maybe<Scalars['String']>
}

export type Mutation = {
    deleteSearch?: Maybe<Scalars['JSON']>
    saveSearch?: Maybe<Scalars['JSON']>
    updateResource?: Maybe<Scalars['JSON']>
    deleteResource?: Maybe<Scalars['JSON']>
}

export type MutationDeleteSearchArgs = {
    resource?: Maybe<Scalars['JSON']>
}

export type MutationSaveSearchArgs = {
    resource?: Maybe<Scalars['JSON']>
}

export type MutationUpdateResourceArgs = {
    selfLink?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    body?: Maybe<Scalars['JSON']>
    cluster?: Maybe<Scalars['String']>
}

export type MutationDeleteResourceArgs = {
    selfLink?: Maybe<Scalars['String']>
    apiVersion?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    cluster?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    childResources?: Maybe<Scalars['JSON']>
}

export type Overview = {
    clusters?: Maybe<Array<Maybe<ClusterOverview>>>
    applications?: Maybe<Array<Maybe<ApplicationOverview>>>
    compliances?: Maybe<Array<Maybe<ComplianceOverview>>>
    timestamp?: Maybe<Scalars['String']>
}

export type PlacementRule = {
    _uid?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    clusterCount?: Maybe<Scalars['JSON']>
    replicas?: Maybe<Scalars['Int']>
}

export type Query = {
    applications?: Maybe<Array<Maybe<Application>>>
    subscriptions?: Maybe<Array<Maybe<Subscription>>>
    placementRules?: Maybe<Array<Maybe<PlacementRule>>>
    channels?: Maybe<Array<Maybe<Channel>>>
    search?: Maybe<Array<Maybe<SearchResult>>>
    messages?: Maybe<Array<Maybe<Message>>>
    searchComplete?: Maybe<Array<Maybe<Scalars['String']>>>
    searchSchema?: Maybe<Scalars['JSON']>
    savedSearches?: Maybe<Array<Maybe<UserSearch>>>
    userAccess?: Maybe<Scalars['JSON']>
    getResource?: Maybe<Scalars['JSON']>
    logs?: Maybe<Scalars['String']>
    overview?: Maybe<Overview>
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

export type QueryUserAccessArgs = {
    resource?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    action: Scalars['String']
    namespace?: Maybe<Scalars['String']>
    apiGroup?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    version?: Maybe<Scalars['String']>
}

export type QueryGetResourceArgs = {
    apiVersion?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    cluster?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    updateInterval?: Maybe<Scalars['Int']>
    deleteAfterUse?: Maybe<Scalars['Boolean']>
}

export type QueryLogsArgs = {
    containerName: Scalars['String']
    podName: Scalars['String']
    podNamespace: Scalars['String']
    clusterName: Scalars['String']
}

export type QueryOverviewArgs = {
    demoMode?: Maybe<Scalars['Boolean']>
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

export type SearchRelatedResult = {
    kind: Scalars['String']
    count?: Maybe<Scalars['Int']>
    items?: Maybe<Scalars['JSON']>
}

export type SearchResult = {
    count?: Maybe<Scalars['Int']>
    items?: Maybe<Scalars['JSON']>
    related?: Maybe<Array<Maybe<SearchRelatedResult>>>
}

export type Subscription = {
    _uid?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    channel?: Maybe<Scalars['String']>
    appCount?: Maybe<Scalars['Int']>
    clusterCount?: Maybe<Scalars['JSON']>
    timeWindow?: Maybe<Scalars['String']>
    localPlacement?: Maybe<Scalars['Boolean']>
    status?: Maybe<Scalars['String']>
}

export type DeleteResource = {
    selfLink?: Maybe<Scalars['String']>
    apiVersion?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    cluster?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    childResources?: Maybe<Scalars['JSON']>
}

export type GetResource = {
    apiVersion?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    cluster?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    updateInterval?: Maybe<Scalars['Int']>
    deleteAfterUse?: Maybe<Scalars['Boolean']>
}

export type Logs = {
    containerName: Scalars['String']
    podName: Scalars['String']
    podNamespace: Scalars['String']
    clusterName: Scalars['String']
}

export type UpdateResource = {
    selfLink?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    body?: Maybe<Scalars['JSON']>
    cluster?: Maybe<Scalars['String']>
}

export type UserAccess = {
    resource?: Maybe<Scalars['String']>
    action?: Maybe<Scalars['String']>
}

export type UserSearch = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    searchText?: Maybe<Scalars['String']>
}

export type GetOverviewQueryVariables = Exact<{
    demoMode?: Maybe<Scalars['Boolean']>
}>

export type GetOverviewQuery = {
    overview?: Maybe<
        Pick<Overview, 'timestamp'> & {
            clusters?: Maybe<
                Array<
                    Maybe<
                        Pick<ClusterOverview, 'consoleURL' | 'status'> & {
                            metadata?: Maybe<Pick<Metadata, 'name' | 'namespace' | 'labels' | 'uid'>>
                        }
                    >
                >
            >
            applications?: Maybe<
                Array<
                    Maybe<
                        Pick<ApplicationOverview, 'raw' | 'selector'> & {
                            metadata?: Maybe<Pick<Metadata, 'name' | 'namespace'>>
                        }
                    >
                >
            >
            compliances?: Maybe<
                Array<
                    Maybe<Pick<ComplianceOverview, 'raw'> & { metadata?: Maybe<Pick<Metadata, 'name' | 'namespace'>> }>
                >
            >
        }
    >
}

export type GetResourceQueryVariables = Exact<{
    apiVersion?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    cluster?: Maybe<Scalars['String']>
    selfLink?: Maybe<Scalars['String']>
    updateInterval?: Maybe<Scalars['Int']>
    deleteAfterUse?: Maybe<Scalars['Boolean']>
}>

export type GetResourceQuery = Pick<Query, 'getResource'>

export type UpdateResourceMutationVariables = Exact<{
    selfLink?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    body?: Maybe<Scalars['JSON']>
    cluster?: Maybe<Scalars['String']>
}>

export type UpdateResourceMutation = Pick<Mutation, 'updateResource'>

export type DeleteResourceMutationVariables = Exact<{
    selfLink?: Maybe<Scalars['String']>
    apiVersion?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    namespace?: Maybe<Scalars['String']>
    cluster?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    childResources?: Maybe<Scalars['JSON']>
}>

export type DeleteResourceMutation = Pick<Mutation, 'deleteResource'>

export type UserAccessQueryVariables = Exact<{
    resource?: Maybe<Scalars['String']>
    kind?: Maybe<Scalars['String']>
    action: Scalars['String']
    namespace?: Maybe<Scalars['String']>
    apiGroup?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    version?: Maybe<Scalars['String']>
}>

export type UserAccessQuery = Pick<Query, 'userAccess'>

export type GetLogsQueryVariables = Exact<{
    containerName: Scalars['String']
    podName: Scalars['String']
    podNamespace: Scalars['String']
    clusterName: Scalars['String']
}>

export type GetLogsQuery = Pick<Query, 'logs'>

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
    input?: Maybe<Array<Maybe<SearchInput>> | Maybe<SearchInput>>
}>

export type SearchResultItemsQuery = { searchResult?: Maybe<Array<Maybe<Pick<SearchResult, 'items'>>>> }

export type SearchResultCountQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>> | Maybe<SearchInput>>
}>

export type SearchResultCountQuery = { searchResult?: Maybe<Array<Maybe<Pick<SearchResult, 'count'>>>> }

export type SearchResultCountAndRelatedCountQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>> | Maybe<SearchInput>>
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
    input?: Maybe<Array<Maybe<SearchInput>> | Maybe<SearchInput>>
}>

export type SearchResultRelatedCountQuery = {
    searchResult?: Maybe<Array<Maybe<{ related?: Maybe<Array<Maybe<Pick<SearchRelatedResult, 'kind' | 'count'>>>> }>>>
}

export type SearchResultRelatedItemsQueryVariables = Exact<{
    input?: Maybe<Array<Maybe<SearchInput>> | Maybe<SearchInput>>
}>

export type SearchResultRelatedItemsQuery = {
    searchResult?: Maybe<Array<Maybe<{ related?: Maybe<Array<Maybe<Pick<SearchRelatedResult, 'kind' | 'items'>>>> }>>>
}

export type GetMessagesQueryVariables = Exact<{ [key: string]: never }>

export type GetMessagesQuery = { messages?: Maybe<Array<Maybe<Pick<Message, 'id' | 'kind' | 'description'>>>> }

export const GetOverviewDocument = gql`
    query getOverview($demoMode: Boolean) {
        overview(demoMode: $demoMode) {
            clusters {
                metadata {
                    name
                    namespace
                    labels
                    uid
                }
                consoleURL
                status
            }
            applications {
                metadata {
                    name
                    namespace
                }
                raw
                selector
            }
            compliances {
                metadata {
                    name
                    namespace
                }
                raw
            }
            timestamp
        }
    }
`

/**
 * __useGetOverviewQuery__
 *
 * To run a query within a React component, call `useGetOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOverviewQuery({
 *   variables: {
 *      demoMode: // value for 'demoMode'
 *   },
 * });
 */
export function useGetOverviewQuery(
    baseOptions?: Apollo.QueryHookOptions<GetOverviewQuery, GetOverviewQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetOverviewQuery, GetOverviewQueryVariables>(GetOverviewDocument, options)
}
export function useGetOverviewLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetOverviewQuery, GetOverviewQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetOverviewQuery, GetOverviewQueryVariables>(GetOverviewDocument, options)
}
export type GetOverviewQueryHookResult = ReturnType<typeof useGetOverviewQuery>
export type GetOverviewLazyQueryHookResult = ReturnType<typeof useGetOverviewLazyQuery>
export type GetOverviewQueryResult = Apollo.QueryResult<GetOverviewQuery, GetOverviewQueryVariables>
export const GetResourceDocument = gql`
    query getResource(
        $apiVersion: String
        $kind: String
        $name: String
        $namespace: String
        $cluster: String
        $selfLink: String
        $updateInterval: Int
        $deleteAfterUse: Boolean
    ) {
        getResource(
            apiVersion: $apiVersion
            kind: $kind
            name: $name
            namespace: $namespace
            cluster: $cluster
            selfLink: $selfLink
            updateInterval: $updateInterval
            deleteAfterUse: $deleteAfterUse
        )
    }
`

/**
 * __useGetResourceQuery__
 *
 * To run a query within a React component, call `useGetResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourceQuery({
 *   variables: {
 *      apiVersion: // value for 'apiVersion'
 *      kind: // value for 'kind'
 *      name: // value for 'name'
 *      namespace: // value for 'namespace'
 *      cluster: // value for 'cluster'
 *      selfLink: // value for 'selfLink'
 *      updateInterval: // value for 'updateInterval'
 *      deleteAfterUse: // value for 'deleteAfterUse'
 *   },
 * });
 */
export function useGetResourceQuery(
    baseOptions?: Apollo.QueryHookOptions<GetResourceQuery, GetResourceQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetResourceQuery, GetResourceQueryVariables>(GetResourceDocument, options)
}
export function useGetResourceLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetResourceQuery, GetResourceQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetResourceQuery, GetResourceQueryVariables>(GetResourceDocument, options)
}
export type GetResourceQueryHookResult = ReturnType<typeof useGetResourceQuery>
export type GetResourceLazyQueryHookResult = ReturnType<typeof useGetResourceLazyQuery>
export type GetResourceQueryResult = Apollo.QueryResult<GetResourceQuery, GetResourceQueryVariables>
export const UpdateResourceDocument = gql`
    mutation updateResource(
        $selfLink: String
        $namespace: String
        $kind: String
        $name: String
        $body: JSON
        $cluster: String
    ) {
        updateResource(
            selfLink: $selfLink
            namespace: $namespace
            kind: $kind
            name: $name
            body: $body
            cluster: $cluster
        )
    }
`
export type UpdateResourceMutationFn = Apollo.MutationFunction<UpdateResourceMutation, UpdateResourceMutationVariables>

/**
 * __useUpdateResourceMutation__
 *
 * To run a mutation, you first call `useUpdateResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResourceMutation, { data, loading, error }] = useUpdateResourceMutation({
 *   variables: {
 *      selfLink: // value for 'selfLink'
 *      namespace: // value for 'namespace'
 *      kind: // value for 'kind'
 *      name: // value for 'name'
 *      body: // value for 'body'
 *      cluster: // value for 'cluster'
 *   },
 * });
 */
export function useUpdateResourceMutation(
    baseOptions?: Apollo.MutationHookOptions<UpdateResourceMutation, UpdateResourceMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<UpdateResourceMutation, UpdateResourceMutationVariables>(UpdateResourceDocument, options)
}
export type UpdateResourceMutationHookResult = ReturnType<typeof useUpdateResourceMutation>
export type UpdateResourceMutationResult = Apollo.MutationResult<UpdateResourceMutation>
export type UpdateResourceMutationOptions = Apollo.BaseMutationOptions<
    UpdateResourceMutation,
    UpdateResourceMutationVariables
>
export const DeleteResourceDocument = gql`
    mutation deleteResource(
        $selfLink: String
        $apiVersion: String
        $name: String
        $namespace: String
        $cluster: String
        $kind: String
        $childResources: JSON
    ) {
        deleteResource(
            selfLink: $selfLink
            apiVersion: $apiVersion
            name: $name
            namespace: $namespace
            cluster: $cluster
            kind: $kind
            childResources: $childResources
        )
    }
`
export type DeleteResourceMutationFn = Apollo.MutationFunction<DeleteResourceMutation, DeleteResourceMutationVariables>

/**
 * __useDeleteResourceMutation__
 *
 * To run a mutation, you first call `useDeleteResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResourceMutation, { data, loading, error }] = useDeleteResourceMutation({
 *   variables: {
 *      selfLink: // value for 'selfLink'
 *      apiVersion: // value for 'apiVersion'
 *      name: // value for 'name'
 *      namespace: // value for 'namespace'
 *      cluster: // value for 'cluster'
 *      kind: // value for 'kind'
 *      childResources: // value for 'childResources'
 *   },
 * });
 */
export function useDeleteResourceMutation(
    baseOptions?: Apollo.MutationHookOptions<DeleteResourceMutation, DeleteResourceMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteResourceMutation, DeleteResourceMutationVariables>(DeleteResourceDocument, options)
}
export type DeleteResourceMutationHookResult = ReturnType<typeof useDeleteResourceMutation>
export type DeleteResourceMutationResult = Apollo.MutationResult<DeleteResourceMutation>
export type DeleteResourceMutationOptions = Apollo.BaseMutationOptions<
    DeleteResourceMutation,
    DeleteResourceMutationVariables
>
export const UserAccessDocument = gql`
    query userAccess(
        $resource: String
        $kind: String
        $action: String!
        $namespace: String
        $apiGroup: String
        $name: String
        $version: String
    ) {
        userAccess(
            resource: $resource
            kind: $kind
            action: $action
            namespace: $namespace
            apiGroup: $apiGroup
            name: $name
            version: $version
        )
    }
`

/**
 * __useUserAccessQuery__
 *
 * To run a query within a React component, call `useUserAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAccessQuery({
 *   variables: {
 *      resource: // value for 'resource'
 *      kind: // value for 'kind'
 *      action: // value for 'action'
 *      namespace: // value for 'namespace'
 *      apiGroup: // value for 'apiGroup'
 *      name: // value for 'name'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserAccessQuery(baseOptions: Apollo.QueryHookOptions<UserAccessQuery, UserAccessQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<UserAccessQuery, UserAccessQueryVariables>(UserAccessDocument, options)
}
export function useUserAccessLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UserAccessQuery, UserAccessQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<UserAccessQuery, UserAccessQueryVariables>(UserAccessDocument, options)
}
export type UserAccessQueryHookResult = ReturnType<typeof useUserAccessQuery>
export type UserAccessLazyQueryHookResult = ReturnType<typeof useUserAccessLazyQuery>
export type UserAccessQueryResult = Apollo.QueryResult<UserAccessQuery, UserAccessQueryVariables>
export const GetLogsDocument = gql`
    query getLogs($containerName: String!, $podName: String!, $podNamespace: String!, $clusterName: String!) {
        logs(containerName: $containerName, podName: $podName, podNamespace: $podNamespace, clusterName: $clusterName)
    }
`

/**
 * __useGetLogsQuery__
 *
 * To run a query within a React component, call `useGetLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLogsQuery({
 *   variables: {
 *      containerName: // value for 'containerName'
 *      podName: // value for 'podName'
 *      podNamespace: // value for 'podNamespace'
 *      clusterName: // value for 'clusterName'
 *   },
 * });
 */
export function useGetLogsQuery(baseOptions: Apollo.QueryHookOptions<GetLogsQuery, GetLogsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetLogsQuery, GetLogsQueryVariables>(GetLogsDocument, options)
}
export function useGetLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLogsQuery, GetLogsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetLogsQuery, GetLogsQueryVariables>(GetLogsDocument, options)
}
export type GetLogsQueryHookResult = ReturnType<typeof useGetLogsQuery>
export type GetLogsLazyQueryHookResult = ReturnType<typeof useGetLogsLazyQuery>
export type GetLogsQueryResult = Apollo.QueryResult<GetLogsQuery, GetLogsQueryVariables>
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<SaveSearchMutation, SaveSearchMutationVariables>(SaveSearchDocument, options)
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteSearchMutation, DeleteSearchMutationVariables>(DeleteSearchDocument, options)
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SavedSearchesQuery, SavedSearchesQueryVariables>(SavedSearchesDocument, options)
}
export function useSavedSearchesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SavedSearchesQuery, SavedSearchesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SavedSearchesQuery, SavedSearchesQueryVariables>(SavedSearchesDocument, options)
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SearchSchemaQuery, SearchSchemaQueryVariables>(SearchSchemaDocument, options)
}
export function useSearchSchemaLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchSchemaQuery, SearchSchemaQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SearchSchemaQuery, SearchSchemaQueryVariables>(SearchSchemaDocument, options)
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
    baseOptions: Apollo.QueryHookOptions<SearchCompleteQuery, SearchCompleteQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SearchCompleteQuery, SearchCompleteQueryVariables>(SearchCompleteDocument, options)
}
export function useSearchCompleteLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchCompleteQuery, SearchCompleteQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SearchCompleteQuery, SearchCompleteQueryVariables>(SearchCompleteDocument, options)
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SearchResultItemsQuery, SearchResultItemsQueryVariables>(SearchResultItemsDocument, options)
}
export function useSearchResultItemsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultItemsQuery, SearchResultItemsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SearchResultItemsQuery, SearchResultItemsQueryVariables>(
        SearchResultItemsDocument,
        options
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SearchResultCountQuery, SearchResultCountQueryVariables>(SearchResultCountDocument, options)
}
export function useSearchResultCountLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultCountQuery, SearchResultCountQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SearchResultCountQuery, SearchResultCountQueryVariables>(
        SearchResultCountDocument,
        options
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SearchResultCountAndRelatedCountQuery, SearchResultCountAndRelatedCountQueryVariables>(
        SearchResultCountAndRelatedCountDocument,
        options
    )
}
export function useSearchResultCountAndRelatedCountLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        SearchResultCountAndRelatedCountQuery,
        SearchResultCountAndRelatedCountQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SearchResultCountAndRelatedCountQuery, SearchResultCountAndRelatedCountQueryVariables>(
        SearchResultCountAndRelatedCountDocument,
        options
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SearchResultRelatedCountQuery, SearchResultRelatedCountQueryVariables>(
        SearchResultRelatedCountDocument,
        options
    )
}
export function useSearchResultRelatedCountLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultRelatedCountQuery, SearchResultRelatedCountQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SearchResultRelatedCountQuery, SearchResultRelatedCountQueryVariables>(
        SearchResultRelatedCountDocument,
        options
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
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SearchResultRelatedItemsQuery, SearchResultRelatedItemsQueryVariables>(
        SearchResultRelatedItemsDocument,
        options
    )
}
export function useSearchResultRelatedItemsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SearchResultRelatedItemsQuery, SearchResultRelatedItemsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SearchResultRelatedItemsQuery, SearchResultRelatedItemsQueryVariables>(
        SearchResultRelatedItemsDocument,
        options
    )
}
export type SearchResultRelatedItemsQueryHookResult = ReturnType<typeof useSearchResultRelatedItemsQuery>
export type SearchResultRelatedItemsLazyQueryHookResult = ReturnType<typeof useSearchResultRelatedItemsLazyQuery>
export type SearchResultRelatedItemsQueryResult = Apollo.QueryResult<
    SearchResultRelatedItemsQuery,
    SearchResultRelatedItemsQueryVariables
>
export const GetMessagesDocument = gql`
    query getMessages {
        messages {
            id
            kind
            description
        }
    }
`

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMessagesQuery(
    baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options)
}
export function useGetMessagesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options)
}
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>
