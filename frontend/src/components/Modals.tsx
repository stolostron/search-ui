import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmModal, AcmButton } from '@open-cluster-management/ui-components'

export const SaveSearchModal = (props: any) => {
    function saveSearch() {
        return props.onClose()
    }

    console.log(props)
    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.medium}
                isOpen={props.saveSearch !== undefined}
                title={props.title}
                onClose={props.onClose}
                actions={[
                    <AcmButton key="confirm" variant={ButtonVariant.primary} onClick={() => saveSearch()}>
                        Save
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
SaveSearchModal.props = {
    title: 'Save search',
    message: 'Name your search and provide a description so that you can access it in the future.',
}

export const ShareSearchModal = (props: any) => {
    console.log(props)
    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.medium}
                isOpen={props.shareSearch !== undefined}
                title={props.title}
                onClose={props.onClose}
                actions={[]}
            >
                {props.message}
            </AcmModal>
        </Fragment>
    )
}
ShareSearchModal.props = {
    title: 'Share search',
    message: 'Copy this private URL to share',
}

export const DeleteSearchModal = (props: any) => {
    function deleteSearch() {
        return props.onClose()
    }

    console.log(props)
    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.medium}
                isOpen={props.deleteSearch !== undefined}
                title={props.title}
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
DeleteSearchModal.props = {
    title: 'Save search',
    message: 'Name your search and provide a description so that you can access it in the future.',
}
