import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmAlert, AcmModal, AcmButton } from '@open-cluster-management/ui-components'
import {
    useUserAccessQuery,
    useDeleteResourceMutation
} from '../../../../console-sdk/console-sdk'
import { consoleClient } from '../../../../console-sdk/console-client'

export interface IDeleteModalProps {
    open: boolean
    close: () => void
    resource: any
}

export const ClosedDeleteModalProps: IDeleteModalProps = {
    open: false,
    close: () => {},
    resource: undefined,
}

export const DeleteResourceModal = (props: any) => {
    const { open, close, resource } = props
    const [deleteResourceMutation, { error }] = useDeleteResourceMutation({ client: consoleClient })
    let apiGroup = ''
    if (resource) {
        const kind = resource.selfLink.split('/')
        apiGroup = kind[1] === 'apis' ? kind[2] : ''
    }
    const userAccessResponse = useUserAccessQuery({
        skip: !resource,
        client: consoleClient,
        variables: {
            resource: resource?.kind,
            action: 'delete',
            namespace: resource?.namespace,
            name: resource?.name,
            apiGroup,
        }
    })

    function deleteResourceFn() {
        deleteResourceMutation({
            variables: {
                selfLink: resource.selfLink,
                name: resource.name,
                namespace: resource.namespace,
                cluster: resource.cluster,
                kind: resource.kind,
                // childResources: // TODO value for 'childResources'
            },
            // refetchQueries: [{ query: SavedSearchesDocument }], // TODO refetch search query
        })
        close()
        return null
    }
    return (
        <Fragment>
            <AcmModal
                variant={ModalVariant.medium}
                isOpen={open}
                title={`Delete ${resource?.kind}`}
                onClose={close}
                actions={[
                    <AcmButton key="cancel" variant={ButtonVariant.secondary} onClick={close}>
                        Cancel
                    </AcmButton>,
                    <AcmButton isDisabled={(userAccessResponse.data && !userAccessResponse.data.userAccess.allowed) || true} key="confirm" variant={ButtonVariant.danger} onClick={() => deleteResourceFn()}>
                        Delete
                    </AcmButton>,
                ]}
            >
                {userAccessResponse.error
                    ? <AcmAlert variant={'danger'} title={userAccessResponse.error} />
                    : null}
                {!userAccessResponse?.data?.userAccess.allowed
                    ? <AcmAlert variant={'danger'} title={'You are not authorized to delete this resource.'} />
                    : null}
                {error
                    ? <AcmAlert variant={'danger'} title={error} />
                    : null}
                <div style={{ paddingTop: '1rem' }} >{`Removing ${resource?.name} is irreversible. Are you sure that you want to continue?`}</div>
            </AcmModal>
        </Fragment>
    )
}
