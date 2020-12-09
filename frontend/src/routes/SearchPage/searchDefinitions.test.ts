import searchDefs, { getAge } from './searchDefinitions'

test('Correctly returns formatSearchbarSuggestions without T in timestamp', () => {
    Date.now = jest.fn(() => 1607028460000);
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        created: '2020-11-30T14:34:20Z'
    }
    const result = getAge(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns formatSearchbarSuggestions with T in timestamp', () => {
    Date.now = jest.fn(() => 1607028460000);
    const item = {
        name: 'testName',
        namespace: 'testNamespace',
        created: '2020-11-3014:34:20Z'
    }
    const result = getAge(item)
    expect(result).toMatchSnapshot()
})

test('Correctly returns formatSearchbarSuggestions no timestamp', () => {
    Date.now = jest.fn(() => 1607028460000);
    const item = {
        name: 'testName',
        namespace: 'testNamespace'
    }
    const result = getAge(item)
    expect(result).toMatchSnapshot()
})