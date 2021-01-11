import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AcmLabels } from '@open-cluster-management/ui-components'

// eslint-disable-next-line import/no-anonymous-default-export
const searchDefinitions: any = {
    application: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Dashboard',
                sort: 'dashboard',
                cell: (item: any) => {
                    return createDashboardLink(item)
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    applicationrelationship: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Source',
                sort: 'source',
                cell: 'source',
            },
            {
                header: 'Destination',
                sort: 'destination',
                cell: 'destination',
            },
            {
                header: 'Type',
                sort: 'type',
                cell: 'type',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    cluster: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Available',
                sort: 'ManagedClusterConditionAvailable',
                cell: 'ManagedClusterConditionAvailable',
            },
            {
                header: 'Hub accepted',
                sort: 'HubAcceptedManagedCluster',
                cell: 'HubAcceptedManagedCluster',
            },
            {
                header: 'Joined',
                sort: 'ManagedClusterJoined',
                cell: 'ManagedClusterJoined',
            },
            {
                header: 'Nodes',
                sort: 'nodes',
                cell: 'nodes',
            },
            {
                header: 'Kubernetes version',
                sort: 'kubernetesVersion',
                cell: 'kubernetesVersion',
            },
            {
                header: 'CPU',
                sort: 'cpu',
                cell: 'cpu',
            },
            {
                header: 'Memory',
                sort: 'memory',
                cell: 'memory',
            },
            {
                header: 'Console URL',
                sort: 'consoleURL',
                cell: (item: any) => {
                    return createExternalLink(item)
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    channel: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Type',
                sort: 'type',
                cell: 'type',
            },
            {
                header: 'Pathname',
                sort: 'pathname',
                cell: 'pathname',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    configmap: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    cronjob: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'schedule',
                sort: 'schedule',
                cell: 'schedule',
            },
            {
                header: 'Suspend',
                sort: 'suspend',
                cell: 'suspend',
            },
            {
                header: 'Active',
                sort: 'active',
                cell: 'active',
            },
            {
                header: 'Last schedule',
                sort: 'lastSchedule',
                cell: (item: any) => {
                    return getAge(item, 'lastSchedule')
                },
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    daemonset: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Desired',
                sort: 'desired',
                cell: 'desired',
            },
            {
                header: 'Current',
                sort: 'current',
                cell: 'current',
            },
            {
                header: 'Ready',
                sort: 'ready',
                cell: 'ready',
            },
            {
                header: 'Updated',
                sort: 'updated',
                cell: 'updated',
            },
            {
                header: 'Available',
                sort: 'available',
                cell: 'available',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    deployable: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Chart URL',
                sort: 'chartUrl',
                cell: 'chartUrl',
            },
            {
                header: 'Dependencies',
                sort: 'dependencies',
                cell: 'dependencies',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    deployment: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Desired',
                sort: 'desired',
                cell: 'desired',
            },
            {
                header: 'Current',
                sort: 'current',
                cell: 'current',
            },
            {
                header: 'Ready',
                sort: 'ready',
                cell: 'ready',
            },
            {
                header: 'Available',
                sort: 'available',
                cell: 'available',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    genericresource: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    helmrelease: {
        // This is the Application Helm CR.
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Source type',
                sort: 'sourceType',
                cell: 'sourceType',
            },
            {
                header: 'URL',
                sort: 'url',
                cell: 'url',
            },
            {
                header: 'Chart path',
                sort: 'chartPath',
                cell: 'chartPath',
            },
            {
                header: 'Branch',
                sort: 'branch',
                cell: 'branch',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    job: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Completions',
                sort: 'completions',
                cell: 'completions',
            },
            {
                header: 'Parallelism',
                sort: 'parallelism',
                cell: 'parallelism',
            },
            {
                header: 'Successful',
                sort: 'successful',
                cell: 'successful',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    namespace: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Status',
                sort: 'status',
                cell: 'status',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    node: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Role',
                sort: 'role',
                cell: 'role',
            },
            {
                header: 'Architecture',
                sort: 'architecture',
                cell: 'architecture',
            },
            {
                header: 'OS image',
                sort: 'osImage',
                cell: 'osImage',
            },
            {
                header: 'CPU',
                sort: 'cpu',
                cell: 'cpu',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    persistentvolume: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Type',
                sort: 'type',
                cell: 'type',
            },
            {
                header: 'Status',
                sort: 'status',
                cell: 'status',
            },
            {
                header: 'Capacity',
                sort: 'capacity',
                cell: 'capacity',
            },
            {
                header: 'Access mode',
                sort: 'accessMode',
                cell: 'accessMode',
            },
            {
                header: 'Claim',
                sort: 'claimRef',
                cell: 'claimRef',
            },
            {
                header: 'Reclaim policy',
                sort: 'reclaimPolicy',
                cell: 'reclaimPolicy',
            },
            {
                header: 'Path',
                sort: 'path',
                cell: 'path',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    persistentvolumeclaim: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Status',
                sort: 'status',
                cell: 'status',
            },
            {
                header: 'Persistent volume',
                sort: 'volumeName',
                cell: 'volumeName',
            },
            {
                header: 'Requests',
                sort: 'request',
                cell: 'request',
            },
            {
                header: 'Access mode',
                sort: 'accessMode',
                cell: 'accessMode',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    placementbinding: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Subjects',
                sort: 'subjects',
                cell: 'subjects',
            },
            {
                header: 'Placement policy',
                sort: 'placementpolicy',
                cell: 'placementpolicy',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    placementpolicy: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Replicas',
                sort: 'replicas',
                cell: 'replicas',
            },
            {
                header: 'Decisions',
                sort: 'decisions',
                cell: 'decisions',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    placementrule: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Replicas',
                sort: 'replicas',
                cell: 'replicas',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    pod: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Status',
                sort: 'status',
                cell: 'status',
            },
            {
                header: 'Restarts',
                sort: 'restarts',
                cell: 'restarts',
            },
            {
                header: 'Host IP',
                sort: 'hostIP',
                cell: 'hostIP',
            },
            {
                header: 'Pod IP',
                sort: 'podIP',
                cell: 'podIP',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    policy: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Disabled',
                sort: 'disabled',
                cell: 'disabled',
            },
            {
                header: 'Compliant',
                sort: 'compliant',
                cell: (item: any) => {
                    // TODO -Show a status icon based on compliance
                    return item.compliant ? item.compliant : '-'
                },
            },
            {
                header: 'Remediation action',
                sort: 'remediationAction',
                cell: 'remediationAction',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    release: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Status',
                sort: 'status',
                cell: 'status',
            },
            {
                header: 'Chart name',
                sort: 'chartName',
                cell: 'chartName',
            },
            {
                header: 'Chart version',
                sort: 'chartVersion',
                cell: 'chartVersion',
            },
            {
                header: 'Updated',
                sort: 'updated',
                cell: (item: any) => {
                    return getAge(item, 'updated')
                },
            },
        ],
    },
    replicaset: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Desired',
                sort: 'desired',
                cell: 'desired',
            },
            {
                header: 'Current',
                sort: 'current',
                cell: 'current',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    secret: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Type',
                sort: 'type',
                cell: 'type',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    service: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Type',
                sort: 'type',
                cell: 'type',
            },
            {
                header: 'Cluster IP',
                sort: 'clusterIP',
                cell: 'clusterIP',
            },
            {
                header: 'Port',
                sort: 'port',
                cell: 'port',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    statefulset: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Desired',
                sort: 'desired',
                cell: 'desired',
            },
            {
                header: 'Current',
                sort: 'current',
                cell: 'current',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
    subscription: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: (item: any) => {
                    return createDetailsLink(item)
                },
            },
            {
                header: 'Namespace',
                sort: 'namespace',
                cell: 'namespace',
            },
            {
                header: 'Cluster',
                sort: 'cluster',
                cell: 'cluster',
            },
            {
                header: 'Package',
                sort: 'package',
                cell: 'package',
            },
            {
                header: 'Status',
                sort: 'status',
                cell: 'status',
            },
            {
                header: 'Local placement',
                sort: 'localPlacement',
                cell: 'localPlacement',
            },
            {
                header: 'Time window',
                sort: 'timeWindow',
                cell: 'timeWindow',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item, 'created')
                },
            },
            {
                header: 'Labels',
                sort: 'label',
                cell: (item: any) => {
                    return formatLabels(item)
                },
            },
        ],
    },
}

export function getAge(item: any, key: string) {
    const createdTime = _.get(item, key)
    if (createdTime && createdTime.includes('T')) {
        return moment(createdTime, 'YYYY-MM-DDTHH:mm:ssZ').fromNow()
    } else if (createdTime) {
        return moment(createdTime, 'YYYY-MM-DD HH:mm:ss').fromNow()
    }
    return '-'
}

export function createDetailsLink(item: any) {
    switch (item.kind) {
        case 'cluster':
            return (
                <a href={`/cluster-management/cluster-management/clusters/${item.namespace}/${item.name}`}>
                    {item.name}
                </a>
            )
        case 'application':
            if (item.apigroup === 'app.k8s.io') {
                // only redirect to apps page if it is an ACM application
                return <a href={`/multicloud/applications/${item.namespace}/${item.name}`}>{item.name}</a>
            }
            return <Link to={{ pathname: `/resources/${item.cluster}${item.selfLink}` }}>{item.name}</Link>
        case 'policy':
            // Redirects to the policy page if the policy is a hub cluster resource.
            // If the policy is not, it will redirect and just show the yaml.
            if (item._hubClusterResource && item.apigroup === 'policy.open-cluster-management.io') {
                return <a href={`/multicloud/policies/all/${item.name}`}>{item.name}</a>
            }
            return <Link to={{ pathname: `/resources/${item.cluster}${item.selfLink}` }}>{item.name}</Link>
        default:
            return <Link to={{ pathname: `/resources/${item.cluster}${item.selfLink}` }}>{item.name}</Link>
    }
}

export function createDashboardLink(item: any) {
    if (item.dashboard !== null && item.dashboard !== '') {
        return (
            <a target="_blank" rel="noopener noreferrer" href={item.dashboard}>
                {'Launch health view'}
            </a>
        )
    }
    return '-'
}

export function createExternalLink(item: any) {
    if (item.consoleURL) {
        return (
            <a target="_blank" rel="noopener noreferrer" href={`${item.consoleURL}`}>
                {'Launch'}
            </a>
        )
    } else if (item.clusterip) {
        return item.clusterip
    }
    return '-'
}

export function formatLabels(item: any) {
    if (item.label) {
        return <AcmLabels labels={item.label.split('; ')} />
    }
    return '-'
}

export default searchDefinitions
