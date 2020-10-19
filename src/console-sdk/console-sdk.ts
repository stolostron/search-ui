import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  bareMetalAssets: Array<BareMetalAsset>;
  managedClusters: Array<ManagedCluster>;
  secrets: Array<Secret>;
  providerConnections: Array<ProviderConnection>;
  clusterDeployments: Array<ClusterDeployment>;
  clusterImageSets: Array<ClusterImageSet>;
  namespaces: Array<Namespace>;
  clusterManagementAddOns: Array<ClusterManagementAddOn>;
};


export type QueryBareMetalAssetsArgs = {
  labelSelector?: Maybe<Scalars['String']>;
  fieldSelector?: Maybe<Scalars['String']>;
};


export type QueryManagedClustersArgs = {
  labelSelector?: Maybe<Scalars['String']>;
  fieldSelector?: Maybe<Scalars['String']>;
};


export type QuerySecretsArgs = {
  labelSelector?: Maybe<Scalars['String']>;
  fieldSelector?: Maybe<Scalars['String']>;
};


export type QueryClusterDeploymentsArgs = {
  labelSelector?: Maybe<Scalars['String']>;
  fieldSelector?: Maybe<Scalars['String']>;
};


export type QueryClusterImageSetsArgs = {
  labelSelector?: Maybe<Scalars['String']>;
  fieldSelector?: Maybe<Scalars['String']>;
};


export type QueryNamespacesArgs = {
  labelSelector?: Maybe<Scalars['String']>;
  fieldSelector?: Maybe<Scalars['String']>;
};


export type QueryClusterManagementAddOnsArgs = {
  labelSelector?: Maybe<Scalars['String']>;
  fieldSelector?: Maybe<Scalars['String']>;
};

export type BareMetalAsset = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
  spec: BareMetalAssetSpec;
};

export type Metadata = {
  creationTimestamp: Scalars['String'];
  uid: Scalars['String'];
  name: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  labels: Array<Scalars['String']>;
};

export type BareMetalAssetSpec = {
  bmc: BareMetalAssetSpecBmc;
};

export type BareMetalAssetSpecBmc = {
  address: Scalars['String'];
  credentialsName: Scalars['String'];
};

export type ManagedCluster = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
  spec: ManagedClusterSpec;
  displayStatus: Scalars['String'];
  status?: Maybe<ManagedClusterStatus>;
  info?: Maybe<ManagedClusterInfo>;
};

export type ManagedClusterSpec = {
  hubAcceptsClient: Scalars['String'];
  leaseDurationSeconds: Scalars['Float'];
};

export type ManagedClusterStatus = {
  allocatable?: Maybe<Capacity>;
  capacity?: Maybe<Capacity>;
  conditions: Array<Condition>;
  version: ManagedClusterVersion;
};

export type Capacity = {
  cpu?: Maybe<Scalars['String']>;
  memory?: Maybe<Scalars['String']>;
};

export type Condition = {
  lastTransitionTime?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  type: Scalars['String'];
};

export type ManagedClusterVersion = {
  kubernetes?: Maybe<Scalars['String']>;
};

export type ManagedClusterInfo = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
  status?: Maybe<ManagedClusterInfoStatus>;
};

export type ManagedClusterInfoStatus = {
  conditions: Array<Condition>;
  nodeList?: Maybe<Array<Node>>;
};

export type Node = {
  name: Scalars['String'];
  capacity: Capacity;
  conditions: Array<Condition>;
};

export type Secret = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
};

export type ProviderConnection = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
  data: ProviderConnectionData;
};

export type ProviderConnectionData = {
  awsAccessKeyID?: Maybe<Scalars['String']>;
  awsSecretAccessKeyID?: Maybe<Scalars['String']>;
  baseDomainResourceGroupName?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
  clientsecret?: Maybe<Scalars['String']>;
  subscriptionid?: Maybe<Scalars['String']>;
  tenantid?: Maybe<Scalars['String']>;
  gcProjectID?: Maybe<Scalars['String']>;
  gcServiceAccountKey?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  vcenter?: Maybe<Scalars['String']>;
  cacertificate?: Maybe<Scalars['String']>;
  vmClusterName?: Maybe<Scalars['String']>;
  datacenter?: Maybe<Scalars['String']>;
  datastore?: Maybe<Scalars['String']>;
  libvirtURI?: Maybe<Scalars['String']>;
  baseDomain: Scalars['String'];
  pullSecret: Scalars['String'];
  sshPrivatekey: Scalars['String'];
  sshPublickey: Scalars['String'];
  isOcp?: Maybe<Scalars['Boolean']>;
};

export type ClusterDeployment = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
};

export type ClusterImageSet = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
};

export type Namespace = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
};

export type ClusterManagementAddOn = {
  apiVersion: Scalars['String'];
  kind: Scalars['String'];
  metadata: Metadata;
  spec: ClusterManagementAddOnSpec;
};

export type ClusterManagementAddOnSpec = {
  addOnConfiguration: ClusterManagementAddOnConfigutation;
  addOnMeta: ClusterManagementAddOnMeta;
};

export type ClusterManagementAddOnConfigutation = {
  crName: Scalars['String'];
  crdName: Scalars['String'];
};

export type ClusterManagementAddOnMeta = {
  decription: Scalars['String'];
  displayName: Scalars['String'];
};

export type Mutation = {
  deleteSecret: Scalars['Boolean'];
  createProviderConnection?: Maybe<Scalars['Boolean']>;
  deleteProviderConnection?: Maybe<Scalars['Boolean']>;
  createClusterDeployment: Scalars['Boolean'];
};


export type MutationDeleteSecretArgs = {
  namespace: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateProviderConnectionArgs = {
  input: ProviderConnectionInput;
};


export type MutationDeleteProviderConnectionArgs = {
  namespace: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateClusterDeploymentArgs = {
  input: ClusterDeploymentInput;
};

export type ProviderConnectionInput = {
  name: Scalars['String'];
  namespace: Scalars['String'];
  providerID: Scalars['String'];
  data: ProviderConnectionDataInput;
};

export type ProviderConnectionDataInput = {
  awsAccessKeyID?: Maybe<Scalars['String']>;
  awsSecretAccessKeyID?: Maybe<Scalars['String']>;
  baseDomainResourceGroupName?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
  clientsecret?: Maybe<Scalars['String']>;
  subscriptionid?: Maybe<Scalars['String']>;
  tenantid?: Maybe<Scalars['String']>;
  gcProjectID?: Maybe<Scalars['String']>;
  gcServiceAccountKey?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  vcenter?: Maybe<Scalars['String']>;
  cacertificate?: Maybe<Scalars['String']>;
  vmClusterName?: Maybe<Scalars['String']>;
  datacenter?: Maybe<Scalars['String']>;
  datastore?: Maybe<Scalars['String']>;
  libvirtURI?: Maybe<Scalars['String']>;
  baseDomain: Scalars['String'];
  pullSecret: Scalars['String'];
  sshPrivatekey: Scalars['String'];
  sshPublickey: Scalars['String'];
  isOcp?: Maybe<Scalars['Boolean']>;
};

export type ClusterDeploymentInput = {
  clusterName: Scalars['String'];
  providerName: Scalars['String'];
  providerConnectionName: Scalars['String'];
  clusterImageSetName: Scalars['String'];
  baseDomain: Scalars['String'];
  networkType: Scalars['String'];
  clusterNetworkCidr: Scalars['String'];
  networkHostPrefix: Scalars['String'];
  serviceNetworkCidr: Scalars['String'];
  machineCidr: Scalars['String'];
  provisioningNetworkCidr: Scalars['String'];
  provisioningNetworkInterface: Scalars['String'];
  provisioningNetworkBridge: Scalars['String'];
  externalNetworkBridge: Scalars['String'];
  apiVip: Scalars['String'];
  ingressVip: Scalars['String'];
  nodePools: Array<ClusterDeploymentNodePoolInput>;
  labels: Array<Scalars['String']>;
};

export type ClusterDeploymentNodePoolInput = {
  poolName: Scalars['String'];
  zones: Array<Scalars['String']>;
  instanceType: Scalars['String'];
  nodeCount: Scalars['Float'];
  rootStorage: Scalars['Float'];
  coresPerSocket: Scalars['Float'];
  cpus: Scalars['Float'];
  memory: Scalars['Float'];
};

export type NamespacesQueryVariables = Exact<{
  labelSelector?: Maybe<Scalars['String']>;
}>;


export type NamespacesQuery = { namespaces: Array<{ metadata: Pick<Metadata, 'uid' | 'name' | 'namespace' | 'labels'> }> };


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
    `;

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
export function useNamespacesQuery(baseOptions?: Apollo.QueryHookOptions<NamespacesQuery, NamespacesQueryVariables>) {
        return Apollo.useQuery<NamespacesQuery, NamespacesQueryVariables>(NamespacesDocument, baseOptions);
      }
export function useNamespacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NamespacesQuery, NamespacesQueryVariables>) {
          return Apollo.useLazyQuery<NamespacesQuery, NamespacesQueryVariables>(NamespacesDocument, baseOptions);
        }
export type NamespacesQueryHookResult = ReturnType<typeof useNamespacesQuery>;
export type NamespacesLazyQueryHookResult = ReturnType<typeof useNamespacesLazyQuery>;
export type NamespacesQueryResult = Apollo.QueryResult<NamespacesQuery, NamespacesQueryVariables>;