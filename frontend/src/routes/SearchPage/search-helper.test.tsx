import { formatSearchbarSuggestions, convertStringToQuery, getSearchCompleteString } from './search-helper'

test('Correctly returns formatSearchbarSuggestions', () => {
    const testData = ['kind', 'cluster', 'deployment']
    const result = formatSearchbarSuggestions(testData, 'filter', '')
    expect(result).toMatchSnapshot()
})

test('Correctly returns formatSearchbarSuggestions', () => {
    const testData = ['name1', 'name2', 'name3']
    const result = formatSearchbarSuggestions(testData, 'value', 'name:name1 name:')
    expect(result).toMatchSnapshot()
})

test('Correctly returns convertStringToQuery', () => {
    const testData = 'namespace:open-cluster-management kind:pod'
    const result = convertStringToQuery(testData)
    expect(result).toMatchSnapshot()
})

test('Correctly returns getSearchCompleteString', () => {
    const testData = 'namespace:open-cluster-management kind:'
    const result = getSearchCompleteString(testData)
    expect(result).toMatchSnapshot()
})
