import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useReducer, useEffect } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import {
    AcmModal,
    AcmButton,
    AcmForm,
    AcmTextInput,
    AcmTextArea,
    AcmAlert,
} from '@open-cluster-management/ui-components'
import { SavedSearchesDocument, useSaveSearchMutation } from '../../../../search-sdk/search-sdk'
import { searchClient } from '../../../../search-sdk/search-client'

type IState = {
    searchName: string
    searchDesc: string
}

type ActionType = {
    field: string
    value: string
}

const initState = {
    searchName: '',
    searchDesc: '',
}

export const SaveAndEditSearchModal = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const { searchName, searchDesc } = state

    const [saveSearchMutation, { error }] = useSaveSearchMutation({ client: searchClient })
    // TODO ERROR NOTIFICATION HANDLING
    if (error) {
        console.log('error', error)
    }

    useEffect(() => {
        dispatch({ field: 'searchName', value: props.editSearch?.name ?? '' })
        dispatch({ field: 'searchDesc', value: props.editSearch?.description ?? '' })
    }, [props.editSearch])

    useEffect(() => {
        dispatch({ field: 'searchName', value: '' })
        dispatch({ field: 'searchDesc', value: '' })
    }, [props.saveSearch])

    function reducer(state: IState, { field, value }: ActionType) {
        return {
            ...state,
            [field]: value,
        }
    }

    function onChange(value: string, e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        dispatch({ field: e.currentTarget.name, value: value })
    }

    function SaveSearch() {
        let id = props.editSearch ? props.editSearch.id : Date.now().toString()
        let searchText = props.editSearch ? props.editSearch.searchText : props.saveSearch
        saveSearchMutation({
            variables: {
                resource: {
                    id: id,
                    name: searchName,
                    description: searchDesc,
                    searchText: searchText,
                },
            },
            refetchQueries: [{ query: SavedSearchesDocument }],
        })
        props.onClose()
        return null
    }

    const isSubmitDisabled = () => {
        return state.searchName === '' || (!props.editSearch && props.saveSearch === '')
    }

    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.small}
                isOpen={props.editSearch !== undefined || props.saveSearch !== undefined}
                title={'Save Search'}
                onClose={props.onClose}
                actions={[
                    <AcmButton key="cancel" variant={ButtonVariant.link} onClick={props.onClose}>
                        Cancel
                    </AcmButton>,
                    <AcmButton
                        isDisabled={isSubmitDisabled()}
                        key="confirm"
                        variant={ButtonVariant.primary}
                        onClick={SaveSearch}
                    >
                        Save
                    </AcmButton>,
                ]}
            >
                {'Name your search and provide a description so that you can access it in the future.'}
                {props.saveSearch === '' && !props.editSearch && (
                    <AcmAlert
                        noClose={true}
                        variant={'danger'}
                        isInline={true}
                        title={'Error'}
                        subtitle={'Enter search text'}
                    />
                )}
                <AcmForm>
                    <AcmTextInput
                        id="add-query-name"
                        name="searchName"
                        label="Search name (50 character limit)"
                        value={searchName}
                        onChange={onChange}
                        maxLength={50}
                    />
                    <AcmTextArea
                        id="add-query-desc"
                        name="searchDesc"
                        label="Description (140 character limit)"
                        value={searchDesc}
                        onChange={onChange}
                        required
                        maxLength={140}
                    />
                </AcmForm>
            </AcmModal>
        </Fragment>
    )
}
