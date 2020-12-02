import React from 'react'
import { render } from '@testing-library/react'
import SearchPage from './SearchPage'

test('renders search', () => {
    const { getByText } = render(<SearchPage />)
    expect(getByText('Search items')).toBeInTheDocument()
})
