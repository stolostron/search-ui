import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
}

export type Metadata = {
	creationTimestamp: Scalars['String']
	uid: Scalars['String']
	name: Scalars['String']
	namespace?: Maybe<Scalars['String']>
	labels: Array<Scalars['String']>
}

export type Namespace = {
	apiVersion: Scalars['String']
	kind: Scalars['String']
	metadata: Metadata
}

export type NamespacesQueryVariables = Exact<{
	labelSelector?: Maybe<Scalars['String']>
}>

export type NamespacesQuery = {
	namespaces: Array<{
		metadata: Pick<Metadata, 'uid' | 'name' | 'namespace' | 'labels'>
	}>
}

export const NamespacesDocument = gql`
	query namespaces($labelSelector: String) {
		namespaces(labelSelector: $labelSelector) {
			metadata {
				uid
				name
				namespace
				labels
			}
		}
	}
`

/**
 * __useNamespacesQuery__
 *
 * To run a query within a React component, call `useNamespacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNamespacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNamespacesQuery({
 *   variables: {
 *      labelSelector: // value for 'labelSelector'
 *   },
 * });
 */
export function useNamespacesQuery(
	baseOptions?: Apollo.QueryHookOptions<
		NamespacesQuery,
		NamespacesQueryVariables
	>
) {
	return Apollo.useQuery<NamespacesQuery, NamespacesQueryVariables>(
		NamespacesDocument,
		baseOptions
	)
}
export function useNamespacesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		NamespacesQuery,
		NamespacesQueryVariables
	>
) {
	return Apollo.useLazyQuery<NamespacesQuery, NamespacesQueryVariables>(
		NamespacesDocument,
		baseOptions
	)
}
export type NamespacesQueryHookResult = ReturnType<typeof useNamespacesQuery>
export type NamespacesLazyQueryHookResult = ReturnType<
	typeof useNamespacesLazyQuery
>
export type NamespacesQueryResult = Apollo.QueryResult<
	NamespacesQuery,
	NamespacesQueryVariables
>
