import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment, useState, useEffect } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmModal, AcmButton, AcmAlert } from '@open-cluster-management/ui-components'
import { SavedSearchesDocument, useDeleteSearchMutation } from '../../../../search-sdk/search-sdk'
import { searchClient } from '../../../../search-sdk/search-client'

export const DeleteSearchModal = (props: any) => {
    const [deleteSearchMutation, { error }] = useDeleteSearchMutation({ client: searchClient })
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        setIsError(false)
    }, [props.deleteSearch])

    const deleteSearch = () => {
        deleteSearchMutation({
            variables: {
                resource: {
                    name: props.deleteSearch.name,
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

    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.medium}
                isOpen={props.deleteSearch !== undefined}
                title={'Delete search'}
                onClose={props.onClose}
                actions={[
                    <AcmButton key="cancel" variant={ButtonVariant.link} onClick={props.onClose}>
                        Cancel
                    </AcmButton>,
                    <AcmButton key="confirm" variant={ButtonVariant.danger} onClick={() => deleteSearch()}>
                        Delete
                    </AcmButton>,
                ]}
            >
                {isError ? <AcmAlert noClose={true} variant={'danger'} title={error!.message} /> : null}
                <p>This action is irreversible. Are you sure that you want to continue?</p>
            </AcmModal>
        </Fragment>
    )
}
