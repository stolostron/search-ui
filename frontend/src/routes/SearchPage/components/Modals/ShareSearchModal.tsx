import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { ModalVariant } from '@patternfly/react-core'
import { AcmCodeSnippet, AcmModal } from '@open-cluster-management/ui-components'

export const ShareSearchModal = (props: any) => {
    function GetUrl() {
        let url = decodeURIComponent(window.location.origin + window.location.pathname)
        let search = props.shareSearch ? props.shareSearch.searchText : ''
        return (url += `?filters={"textsearch":"${encodeURIComponent(search)}"}`)
    }

    return (
        <Fragment>
            <AcmModal
                title={'Share search'}
                variant={ModalVariant.small}
                isOpen={props.shareSearch !== undefined}
                onClose={props.onClose}
                actions={[]}
            >
                <p>Copy this private URL to share</p>
                <AcmCodeSnippet
                    id="snippet"
                    command={GetUrl()}
                    copyTooltipText="Copy to clipboard"
                    copySuccessText="Copied!"
                />
            </AcmModal>
        </Fragment>
    )
}
