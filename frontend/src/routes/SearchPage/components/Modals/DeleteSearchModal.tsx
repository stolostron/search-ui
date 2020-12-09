import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmModal, AcmButton } from '@open-cluster-management/ui-components'
import { SavedSearchesDocument, useDeleteSearchMutation } from '../../../../search-sdk/search-sdk'
import { searchClient } from '../../../../search-sdk/search-client'

export const DeleteSearchModal = (props: any) => {
    const [deleteSearchMutation, { error }] = useDeleteSearchMutation({ client: searchClient })
    // TODO ERROR NOTIFICATION HANDLING
    if (error) {
        console.log('error', error)
    }

    function deleteSearch() {
        deleteSearchMutation({
            variables: {
                resource: {
                    name: props.deleteSearch.name,
                },
            },
            refetchQueries: [{ query: SavedSearchesDocument }],
        })
        props.onClose()
        return null
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
                <p>This action is irreversible. Are you sure that you want to continue?</p>
            </AcmModal>
        </Fragment>
    )
}
