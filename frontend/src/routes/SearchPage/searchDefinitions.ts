// import { getAge } from '../../lib/shared/resource-helper'
// import { createDashboardLink } from './hcm-applications'
// import { /*getStatusIcon as getClusterStatusIcon,*/ getExternalLink } from './hcm-clusters'
// import StatusField from '../components/common/StatusField'
// import Labels from '../components/common/Labels'
import _ from 'lodash'
import moment from 'moment'

// eslint-disable-next-line import/no-anonymous-default-export
const searchDefinitions: any = {
    application: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // {
            //     header: 'Dashboard',
            //     sort: 'dashboard',
            //     cell: 'dashboard',
            //     transform: createDashboardLink,
            // },
            // {
            //     header: 'Label',
            //     sort: 'labels',
            //     cell: 'labels',
            //     transform: formatLabels,
            // }
        ],
    },
    applicationrelationship: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
//       { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    cluster: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
            // {
            //     header: 'Console URL',
            //     sort: 'consoleURL',
            //     cell: (item: any) => {
            //         return getExternalLink(item)
            //     },
            // },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    channel: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    configmap: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    cronjob: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
            // { key: 'lastSchedule', transform: (item) => getAge({ created: item.lastSchedule }) },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    daemonset: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    deployable: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    deployment: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
        //   { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    genericresource: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
        //   { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    helmrelease: { // This is the Application Helm CR.
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    job: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    namespace: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    node: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    persistentvolume: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    persistentvolumeclaim: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    placementbinding: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    placementpolicy: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    placementrule: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    pod: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    policy: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
            // { key: 'compliant', transform: getPolicyStatusIcon },
            {
                header: 'Remediation action',
                sort: 'remediationAction',
                cell: 'remediationAction',
            },
            {
                header: 'Created',
                sort: 'created',
                cell: (item: any) => {
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    release: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
            // { key: 'updated', transform: (item) => getAge({ created: item.updated }) }
        ],
    },
    replicaset: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    secret: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    service: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    statefulset: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
    subscription: {
        columns: [
            {
                header: 'Name',
                sort: 'name',
                cell: 'name',
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
                    return getAge(item)
                },
            },
            // { key: 'label', msgKey: 'labels', transform: formatLabels },
        ],
    },
}

export function getAge(item: any) {
    const createdTime = _.get(item, 'created')
    if (createdTime && createdTime.includes('T')) {
      return moment(createdTime, 'YYYY-MM-DDTHH:mm:ssZ').fromNow()
    } else if (createdTime) {
      return moment(createdTime, 'YYYY-MM-DD HH:mm:ss').fromNow()
    }
    return '-'
}

// function formatLabels(item){
//   const labels = item && item.label && item.label.split('; ')
//   const formattedLabels = {}
//   if (labels) {
//     labels.forEach(label => {
//       if (label && label.indexOf('=') > -1) {
//         const [key, value] = label.split('=')
//         formattedLabels[key] = value
//       }
//     })
//   }

//   return <Labels item={{metadata: {labels: formattedLabels}}} labelTags={Object.keys(formattedLabels).slice(0,2)}></Labels>
// }

// export function getPolicyStatusIcon(item, locale) {
//   if (item.compliant){
//     if (item.compliant.toLowerCase() === 'compliant') {
//       return <StatusField status='ok' text={msgs.get('policy.status.compliant', locale)} />
//     } else {
//       return <StatusField status='critical' text={msgs.get('policy.status.noncompliant', locale)} />
//     }
//   }
//   return '-'
// }

export default searchDefinitions