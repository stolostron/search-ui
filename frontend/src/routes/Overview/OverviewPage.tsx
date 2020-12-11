import React from 'react';
import { AcmDonutChart, AcmLoadingPage, AcmPage, AcmPageHeader, AcmOverviewProviders, AcmSummaryList, Provider } from '@open-cluster-management/ui-components'
import { consoleClient } from '../../console-sdk/console-client'
import {
    useGetOverviewQuery,
} from '../../console-sdk/console-sdk'

export default function OverviewPage() {
    
    const { data, loading, error } = useGetOverviewQuery({client: consoleClient})
    if (loading){
        return (
            <AcmPage>
                <AcmPageHeader title="Overview" />
                
                <AcmLoadingPage />
                <div style={{ margin: "2rem 1rem 1rem 2rem" }}>
                    <AcmSummaryList key="summary-list-loading" loading title="Summary" list={[]}/>
                </div>
            </AcmPage>    
            )
    }

    if (error){
        // TODO: need better error message.
        return (<p>Error getting data.</p>)
    }

    const providers = [
        { provider: Provider.aws, clusterCount: 99, onClick: ()=>{console.log('clicked AWS')}}, 
        { provider: Provider.azure, clusterCount: 99, onClick: ()=>{console.log('clicked Azure')}}, 
        { provider: Provider.ibm, clusterCount: 99, onClick: ()=>{console.log('clicked AWS')} }, 
        ]

    const summary = [
        { isPrimary: true, description: 'Applications', count: data?.overview?.applications?.length || 0, href: '/search?query=apps' },
        { isPrimary: false, description: 'Clusters', count: data?.overview?.clusters?.length || 0, href: '/search?query=clusters' },
        { isPrimary: false, description: 'Kubernetes type', count: 99, href: '/search' },
        { isPrimary: false, description: 'Region', count: 99, href: '/search' },
        { isPrimary: false, description: 'Nodes', count: 99, href: '/search?query=nodes' },
        { isPrimary: false, description: 'Pods', count: 99, href: '/search?query=pods' },
    ]

    const complianceData = [
        { key: 'Compliant', value: 99, isPrimary: true },
        { key: 'Non-compliant', value: 99, isDanger: true },
    ]

    const podData = [
        { key: 'Running', value: 99, isPrimary: true },
        { key: 'Pending', value: 99 },
        { key: 'Failed', value: 99, isDanger: true },
    ]

    const clusterData = [
        { key: 'Ready', value: 99, isPrimary: true },
        { key: 'Offline', value: 99, isDanger: true },
    ]

    return (
        <AcmPage>  
            <AcmPageHeader title="Overivew" />

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
