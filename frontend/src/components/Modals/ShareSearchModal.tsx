import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { ModalVariant } from '@patternfly/react-core'
import { AcmModal } from '@open-cluster-management/ui-components'

export const ShareSearchModal = (props: any) => {
    return (
        <Fragment>
            <AcmModal
                title={'Share search'}
                variant={ModalVariant.medium}
                isOpen={props.shareSearch !== undefined}
                onClose={props.onClose}
                actions={[]}
            >
                {props.message}
            </AcmModal>
        </Fragment>
    )
}
