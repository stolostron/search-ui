import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmModal, AcmButton } from '@open-cluster-management/ui-components'

export const DeleteSearchModal = (props: any) => {
    function deleteSearch() {
        return props.onClose()
    }
    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.medium}
                isOpen={props.deleteSearch !== undefined}
                title={'Delete search'}
                onClose={props.onClose}
                actions={[
                    <AcmButton key="confirm" variant={ButtonVariant.danger} onClick={() => deleteSearch()}>
                        Delete
                    </AcmButton>,
                    <AcmButton key="cancel" variant={ButtonVariant.link} onClick={props.onClose}>
                        Cancel
                    </AcmButton>,
                ]}
            >
                {props.message}
            </AcmModal>
        </Fragment>
    )
}
