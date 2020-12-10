
import { AcmDonutChart, AcmPage, AcmPageHeader, AcmOverviewProviders, AcmSummaryList, Provider } from '@open-cluster-management/ui-components'

export default function OverviewPage() {
    
    const summary = [
        { isPrimary: true, description: 'Applications', count: 3, href: '/search?query=apps' },
        { description: 'Clusters', count: 2, href: '/search?query=clusters' },
        { description: 'Kubernetes type', count: 1 },
        { description: 'Region', count: 1 },
        { description: 'Nodes', count: 3, href: '/search?query=nodes' },
        { description: 'Pods', count: 3, href: '/search?query=pods' },
    ]

    const providers = [
        { provider: Provider.aws, clusterCount: 4, onClick: ()=>{}}, 
        { provider: Provider.azure, clusterCount: 1, onClick: ()=>{}}, 
        { provider: Provider.ibm, clusterCount: 3, onClick: ()=>{}}, 
        ]

    const complianceData = [
        { key: 'Compliant', value: 5, isPrimary: true },
        { key: 'Non-compliant', value: 2, isDanger: true },
    ]
    const podData = [
        { key: 'Running', value: 90, isPrimary: true },
        { key: 'Pending', value: 8 },
        { key: 'Failed', value: 2, isDanger: true },
    ]
    const clusterData = [
        { key: 'Ready', value: 2, isPrimary: true },
        { key: 'Offline', value: 0, isDanger: true },
    ]

    return (
        <AcmPage>
            <AcmPageHeader title="Overview" />
            
            <div style={{ margin: "2rem 1rem 1rem 2rem" }}>
                <AcmOverviewProviders providers={providers} />
            </div>
            
            <div style={{ margin: "1rem 2rem 1rem 2rem" }}>
                <AcmSummaryList title="Summary" list={summary}/>
            </div>
           
           <div style={{ margin: "1rem 1rem 1rem 2rem", display: "flex" }}>
                <AcmDonutChart title="Cluster compliance" description="Overview of policy compliance status" data={complianceData} />
                <AcmDonutChart title="Pods" description="Overview of pod count and status" data={podData} />
                <AcmDonutChart title="Cluster status" description="Overview of cluster status" data={clusterData} />
            </div>
        </AcmPage>
    )
}
