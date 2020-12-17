import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useReducer, useEffect, useState } from 'react'
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
import { makeStyles } from '@material-ui/styles'

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

const useStyles = makeStyles({
    prompt: {
        paddingBottom: '1.5rem',
    },
})

export const SaveAndEditSearchModal = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initState)
    const { searchName, searchDesc } = state
    const [saveSearchMutation, { error }] = useSaveSearchMutation({ client: searchClient })
    const [isError, setIsError] = useState<boolean>(false)
    const classes = useStyles()

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
        props.setSelectedSearch(searchName)
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
        }).then((res) => {
            if (res.errors) {
                setIsError(true)
                return null
            }
            props.onClose()
            return null
        })
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
                    <AcmButton
                        isDisabled={isSubmitDisabled()}
                        key="confirm"
                        variant={ButtonVariant.primary}
                        onClick={SaveSearch}
                    >
                        Save
                    </AcmButton>,
                    <AcmButton key="cancel" variant={ButtonVariant.link} onClick={props.onClose}>
                        Cancel
                    </AcmButton>,
                ]}
            >
                {
                    <p className={classes.prompt}>
                        Name your search and provide a description so that you can access it in the future.
                    </p>
                }
                {props.saveSearch === '' && !props.editSearch && (
                    <AcmAlert
                        noClose
                        variant={'danger'}
                        isInline={true}
                        title={'Error'}
                        subtitle={'Enter search text'}
                    />
                )}
                {isError && <AcmAlert noClose variant={'danger'} title={error!.message} />}
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
                        label="Description (120 character limit)"
                        value={searchDesc}
                        onChange={onChange}
                        required
                        maxLength={120}
                    />
                </AcmForm>
            </AcmModal>
        </Fragment>
    )
}
