import { formatSearchbarSuggestions, convertStringToQuery } from './search-helper'

test('Correctly returns formatSearchbarSuggestions', () => {
    const testData = ['kind', 'cluster', 'deployment']
    const result = formatSearchbarSuggestions(testData, 'filter')
    expect(result).toMatchSnapshot()
})

test('Correctly returns convertStringToQuery', () => {
    const testData = 'namespace:open-cluster-management kind:pod'
    const result = convertStringToQuery(testData)
    expect(result).toMatchSnapshot()
})
