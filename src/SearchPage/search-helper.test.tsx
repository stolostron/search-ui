import React from 'react'
import { render } from '@testing-library/react'
import { formatSearchbarSuggestions, convertStringToQuery, formatNumber } from './search-helper'

test('Correctly returns formatSearchbarSuggestions', () => {
    const testData = [
        'kind',
        'cluster',
        'deployment'
    ]
    const result = formatSearchbarSuggestions(testData, 'filter')
    expect(result).toMatchSnapshot()
})

test('Correctly returns convertStringToQuery', () => {
    const testData = 'namespace:open-cluster-management kind:pod'
    const result = convertStringToQuery(testData)
    expect(result).toMatchSnapshot()
})

test('Correctly returns formatNumber of number larger than 999', () => {
    const testData = 1000
    const result = formatNumber(testData)
    expect(result).toMatchSnapshot()
})
test('Correctly returns formatNumber of number smaller than 999', () => {
    const testData = 10
    const result = formatNumber(testData)
    expect(result).toMatchSnapshot()
})
