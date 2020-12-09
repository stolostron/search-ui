import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useReducer, useEffect } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmModal, AcmButton, AcmForm, AcmTextInput, AcmTextArea } from '@open-cluster-management/ui-components'
import { useSaveSearchMutation } from '../../search-sdk/search-sdk'
import { searchClient } from '../../search-sdk/search-client'

export const SaveAndEditSearchModal = (props: any) => {
    interface IState {
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

    function reducer(state: IState, { field, value }: ActionType) {
        return {
            ...state,
            [field]: value,
        }
    }
    const [state, dispatch] = useReducer(reducer, initState)
    const { searchName, searchDesc } = state

    const [saveSearchMutation, { error }] = useSaveSearchMutation({ client: searchClient })
    if (error) {
        console.log('error', error)
    }

    const onChange = (value: string, e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ field: e.currentTarget.name, value: value })
    }

    useEffect(() => {
        dispatch({ field: 'searchName', value: props.saveSearch?.name ?? '' })
        dispatch({ field: 'searchDesc', value: props.saveSearch?.description ?? '' })
    }, [props.saveSearch])

    function SaveSearch() {
        let id = props.saveSearch.description ? props.saveSearch.id : Date.now().toString()
        // let searchText = props.saveSearch.description
        saveSearchMutation({
            variables: {
                resource: {
                    id: id,
                    name: searchName,
                    description: searchDesc,
                    searchText: props.saveSearch.searchText,
                },
            },
        })

        props.onClose()
        return null
    }

    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.small}
                isOpen={props.saveSearch !== undefined}
                title={'Save Search'}
                onClose={props.onClose}
                actions={[
                    <AcmButton key="confirm" variant={ButtonVariant.primary} onClick={SaveSearch}>
                        Save
                    </AcmButton>,
                    <AcmButton key="cancel" variant={ButtonVariant.link} onClick={props.onClose}>
                        Cancel
                    </AcmButton>,
                ]}
            >
                {'Name your search and provide a description so that you can access it in the future.'}
                <AcmForm>
                    <AcmTextInput
                        id="add-query-name"
                        name="searchName"
                        label="Name your search and provide a description so that you can access it in the future."
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
