// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { GraphQLError } from 'graphql'
import { wait } from '../../lib/test-helper'
import SearchPage from './SearchPage'
import { SavedSearchesDocument, SearchSchemaDocument, SearchCompleteDocument } from '../../search-sdk/search-sdk'

describe('SearchPage', () => {
    it('should render default search page correctly', async () => {
        const mocks = [
            {
                request: {
                    query: SavedSearchesDocument,
                },
                result: {
                    data: {
                        items: [
                            {
                                description: 'testSavedQueryDesc1',
                                id: '1609811592984',
                                name: 'testSavedQuery1',
                                searchText: 'kind:pod',
                                __typename: 'userSearch',
                            },
                        ],
                    },
                },
            },
            {
                request: {
                    query: SearchSchemaDocument,
                },
                result: {
                    data: {
                        searchSchema: {
                            allProperties: ['cluster', 'kind', 'label', 'name', 'namespace'],
                        },
                    },
                },
            },
        ]
        render(
            <RecoilRoot>
                <Router history={createBrowserHistory()}>
                    <MockedProvider mocks={mocks}>
                        <SearchPage />
                    </MockedProvider>
                </Router>
            </RecoilRoot>
        )
        // Test the loading state while apollo query finishes - testing that saved searches card label is not present
        expect(screen.getAllByText('Saved searches')[1]).toBeFalsy()
        // This wait pauses till apollo query is returning data
        await wait()
        // Test that the component has rendered correctly with data
        await waitFor(() => expect(screen.queryByText('search.new.tab')).toBeTruthy())
        await waitFor(() => expect(screen.queryByText('Saved searches')).toBeTruthy())
    })

    it('should render page with errors', async () => {
        const mocks = [
            {
                request: {
                    query: SavedSearchesDocument,
                },
                result: {
                    data: {
                        items: [
                            {
                                description: 'testSavedQueryDesc1',
                                id: '1609811592984',
                                name: 'testSavedQuery1',
                                searchText: 'kind:pod',
                                __typename: 'userSearch',
                            },
                        ],
                    },
                },
            },
            {
                request: {
                    query: SearchSchemaDocument,
                },
                result: {
                    data: {},
                    errors: [new GraphQLError('Error getting search schema data')],
                },
            },
        ]
        render(
            <RecoilRoot>
                <Router history={createBrowserHistory()}>
                    <MockedProvider mocks={mocks}>
                        <SearchPage />
                    </MockedProvider>
                </Router>
            </RecoilRoot>
        )
        // Test the loading state while apollo query finishes - testing that saved searches card label is not present
        expect(screen.getAllByText('Saved searches')[1]).toBeFalsy()
        // This wait pauses till apollo query is returning data
        await wait()
        // Test that the component has rendered correctly with data
        await waitFor(() => expect(screen.queryByText('search.filter.errors.title')).toBeTruthy())
        await waitFor(() => expect(screen.queryByText('search.filter.errors.description')).toBeTruthy())
    })

    it('should render search page correctly and add a search', async () => {
        const mocks = [
            {
                request: {
                    query: SavedSearchesDocument,
                },
                result: {
                    data: {
                        items: [
                            {
                                description: 'testSavedQueryDesc1',
                                id: '1609811592984',
                                name: 'testSavedQuery1',
                                searchText: 'kind:pod',
                                __typename: 'userSearch',
                            },
                        ],
                    },
                },
            },
            {
                request: {
                    query: SearchSchemaDocument,
                },
                result: {
                    data: {
                        searchSchema: {
                            allProperties: ['cluster', 'kind', 'label', 'name', 'namespace'],
                        },
                    },
                },
            },
            {
                request: {
                    query: SearchCompleteDocument,
                    variables: {
                        property: 'kind',
                        query: {
                            filters: [],
                            keywords: [],
                            limit: 10000,
                        },
                    },
                },
                result: {
                    data: {
                        searchComplete: ['cluster', 'pod', 'deployment'],
                    },
                },
            },
        ]
        render(
            <RecoilRoot>
                <Router history={createBrowserHistory()}>
                    <MockedProvider mocks={mocks}>
                        <SearchPage />
                    </MockedProvider>
                </Router>
            </RecoilRoot>
        )
        // Test the loading state while apollo query finishes - testing that saved searches card label is not present
        expect(screen.getAllByText('Saved searches')[1]).toBeFalsy()
        // This wait pauses till apollo query is returning data
        await wait()
        // Test that the component has rendered correctly with data
        await waitFor(() => expect(screen.queryByText('search.new.tab')).toBeTruthy())
        await waitFor(() => expect(screen.queryByText('Saved searches')).toBeTruthy())

        const searchbar = screen.getByText('Search items')
        expect(searchbar).toBeTruthy()
        userEvent.click(searchbar)
        userEvent.type(searchbar, 'kind ')

        // check if the three values are diplayed
        await waitFor(() => expect(screen.queryByText('cluster')).toBeTruthy())
        await waitFor(() => expect(screen.queryByText('pod')).toBeTruthy())
        await waitFor(() => expect(screen.queryByText('deployment')).toBeTruthy())

        // click on a value
        const suggestionItem = screen.getByText('deployment')
        expect(suggestionItem).toBeTruthy()
        userEvent.click(suggestionItem)

        // check searchbar updated properly
        await waitFor(() => expect(screen.queryByText('kind:deployment')).toBeTruthy())
    })
})
