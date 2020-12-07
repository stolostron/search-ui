import {
    getResourceName,
    setResourceName,
    getResourceNamespace,
    setResourceNamespace,
    getResourceApiPath,
    getResourceNameApiPath,
} from './resource'

describe('Resource.ts', () => {
    test('Correctly returns getResourceName', () => {
        const result = getResourceName({
            apiVersion: 'api/v1',
            kind: 'pod',
            metadata: {
                name: 'testPod',
                namespace: 'testNamespace',
            },
        })
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns setResourceName', () => {
        const result = setResourceName(
            {
                apiVersion: 'api/v1',
                kind: 'pod',
                metadata: {
                    name: 'testPod',
                    namespace: 'testNamespace',
                },
            },
            'newName'
        )
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns setResourceName without meta', () => {
        const result = setResourceName(
            {
                apiVersion: 'api/v1',
                kind: 'pod',
            },
            'newName'
        )
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns getResourceNamespace', () => {
        const result = getResourceNamespace({
            apiVersion: 'api/v1',
            kind: 'pod',
            metadata: {
                name: 'testPod',
                namespace: 'testNamespace',
            },
        })
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns setResourceNamespace', () => {
        const result = setResourceNamespace(
            {
                apiVersion: 'api/v1',
                kind: 'pod',
                metadata: {
                    name: 'testPod',
                    namespace: 'testNamespace',
                },
            },
            'newNamespace'
        )
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns setResourceNamespace wihtout meta', () => {
        const result = setResourceNamespace(
            {
                apiVersion: 'api/v1',
                kind: 'pod',
            },
            'newNamespace'
        )
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns getResourceNameApiPath', () => {
        const testData = {
            apiVersion: 'v1',
            kind: 'pod',
            plural: undefined,
            metadata: {
                name: 'testPod',
                namespace: 'testNamespace',
            },
        }
        const result = getResourceNameApiPath(testData)
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns getResourceNameApiPath alt arguments', () => {
        const testData = {
            apiVersion: 'api/v1',
            plural: 'pluralValues',
        }
        const result = getResourceNameApiPath(testData)
        expect(result).toMatchSnapshot()
    })

    test('Correctly returns getResourceNameApiPath no kind', () => {
        const testData = {
            apiVersion: 'v1',
            kind: undefined,
            plural: undefined,
            metadata: {
                name: 'testPod',
                namespace: 'testNamespace',
            },
        }
        const result = getResourceNameApiPath(testData)
        expect(result).toMatchSnapshot()
    })
})
