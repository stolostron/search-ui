import React, { useState, useEffect } from 'react';
import { AcmCountCard, AcmDonutChart, AcmLoadingPage, AcmPage, AcmPageHeader, AcmOverviewProviders, AcmSummaryList, Provider } from '@open-cluster-management/ui-components'


export default function OverviewPage() {
    const [providers, setProviders] = useState<Array<any>>([{ provider: Provider.other, clusterCount: 0, onClick: fetchData}] )
    const [summary, setSummary] = useState<Array<any>>([{ isPrimary: true, description: 'Applications', count: 0, href: '/search?query=apps' }]);
    
    const [complianceData, setComplianceData ] = useState<Array<any>>([])
    const [podData, setpodData ] = useState<Array<any>>([])
    const [clusterData, setClusterData ] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        
        setTimeout(fetchData, 3000)

      }, []);
    
    function fetchData() {
        // TODO: call apollo client
        console.log('TODO: fetch data using the apollo client.')
        setSummary([
                { isPrimary: true, description: 'Applications', count: 3, href: '/search?query=apps' },
                { isPrimary: false, description: 'Clusters', count: 2, href: '/search?query=clusters' },
                { isPrimary: false, description: 'Kubernetes type', count: 1, href: '/search' },
                { isPrimary: false, description: 'Region', count: 1, href: '/search' },
                { isPrimary: false, description: 'Nodes', count: 3, href: '/search?query=nodes' },
                { isPrimary: false, description: 'Pods', count: 3, href: '/search?query=pods' },
            ])

        setProviders([
            { provider: Provider.aws, clusterCount: 4, onClick: ()=>{console.log('clicked AWS')}}, 
            { provider: Provider.azure, clusterCount: 1, onClick: ()=>{console.log('clicked Azure')}}, 
            { provider: Provider.ibm, clusterCount: 3, onClick: fetchData }, 
            ])

        setComplianceData([
            { key: 'Compliant', value: 5, isPrimary: true },
            { key: 'Non-compliant', value: 2, isDanger: true },
        ])

        setpodData([
            { key: 'Running', value: 90, isPrimary: true },
            { key: 'Pending', value: 8 },
            { key: 'Failed', value: 2, isDanger: true },
        ])

        setClusterData([
            { key: 'Ready', value: 2, isPrimary: true },
            { key: 'Offline', value: 0, isDanger: true },
        ])

        setLoading(false)
    }

    if (loading){
        return (
            <AcmPage>
                <AcmPageHeader title="Overview" />
                <div style={{ margin: "2rem 1rem 1rem 2rem" }}>
                    {/* <AcmOverviewProviders providers={providers} /> */}
                    <AcmCountCard loading />
                    <AcmCountCard loading />
                    <AcmCountCard loading />
                </div>
                <AcmLoadingPage />
            </AcmPage>    
            )
    }
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
