import { getAge, createDetailsLink, createDashboardLink, createExternalLink, formatLabels } from './searchDefinitions'

test('Correctly returns formatSearchbarSuggestions without T in timestamp', () => {
    Date.now = jest.fn(() => 1607028460000);
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        created: '2020-11-30T14:34:20Z'
    }
    const result = getAge(item, 'created')
    expect(result).toMatchSnapshot()
})

test('Correctly returns formatSearchbarSuggestions with T in timestamp', () => {
    Date.now = jest.fn(() => 1607028460000);
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        created: '2020-11-3014:34:20Z'
    }
    const result = getAge(item, 'created')
    expect(result).toMatchSnapshot()
})

test('Correctly returns formatSearchbarSuggestions no timestamp', () => {
    Date.now = jest.fn(() => 1607028460000);
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
    }
    const result = getAge(item, 'created')
    expect(result).toMatchSnapshot()
})

test('Correctly returns createDetailsLink - Cluster', () => {
    const item = {
        name: 'testClusterName',
        namespace: 'testClusterNamespace',
        kind: 'cluster'
    }
    const result = createDetailsLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createDetailsLink - ACM-Application', () => {
    const item = {
        name: 'testApplicationName',
        namespace: 'testApplicationNamespace',
        kind: 'application',
        apigroup: 'app.k8s.io',
    }
    const result = createDetailsLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createDetailsLink - NON-Application', () => {
    const item = {
        name: 'testApplicationName',
        namespace: 'testApplicationNamespace',
        kind: 'application',
        cluster: 'testCluster',
        selfLink: '/self/link'
    }
    const result = createDetailsLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createDetailsLink - HUB-Policy', () => {
    const item = {
        name: 'testPolicyName',
        namespace: 'testPolicyNamespace',
        kind: 'policy',
        _hubClusterResource: true,
        apigroup: 'policy.open-cluster-management.io'
    }
    const result = createDetailsLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createDetailsLink - Managed-Policy', () => {
    const item = {
        name: 'testPolicyName',
        namespace: 'testPolicyNamespace',
        kind: 'policy',
        cluster: 'testCluster',
        selfLink: '/self/link'
    }
    const result = createDetailsLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createDetailsLink - Default', () => {
    const item = {
        name: 'testPodName',
        namespace: 'testPodNamespace',
        kind: 'pod',
        cluster: 'testCluster',
        selfLink: '/self/link'
    }
    const result = createDetailsLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createDashboardLink', () => {
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        dashboard: 'http://dashboard'
    }
    const result = createDashboardLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns empty createDashboardLink', () => {
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        dashboard: ''
    }
    const result = createDashboardLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createExternalLink from consoleURL', () => {
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        consoleURL: 'http://consoleurl'
    }
    const result = createExternalLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns createExternalLink from clusterip', () => {
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        clusterip: 'http://clusterip'
    }
    const result = createExternalLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns empty createExternalLink', () => {
    const item = {
        name: 'testName',
        namespace: 'testNamespace'
    }
    const result = createExternalLink(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns label components', () => {
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        label: 'testlabel=label1; testlabel=label2'
    }
    const result = formatLabels(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns empty labels', () => {
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
    }
    const result = formatLabels(item)
    expect(result).toMatchSnapshot()
})