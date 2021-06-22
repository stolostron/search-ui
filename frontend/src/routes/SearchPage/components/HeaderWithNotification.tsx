// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { useTranslation } from 'react-i18next'
import { AcmPageHeader, AcmInlineStatus, StatusType } from '@open-cluster-management/ui-components'
import { Card, CardBody } from '@patternfly/react-core'

// 1. Needed to export as default function.
export default function HeaderWithNotification(props: { queryMessages: any[] }) {
    const { t } = useTranslation(['search'])
    const messages: any[] = props.queryMessages

    return (
        <div>
            <div style={{ outline: 'none', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                    <AcmPageHeader title={t('search')} />
                </div>

                {messages?.map((msg) => {
                    const displayShortText = t(`messages.${msg?.id}.short`)
                    const displayLongText = t(`messages.${msg?.id}.long`)

                    return (
                        <Card style={{ border: 'none', boxShadow: 'none' }}>
                            <CardBody>
                                <AcmInlineStatus
                                    type={StatusType.warning}
                                    status={displayShortText}
                                    popover={{
                                        headerContent: <div>{displayShortText}</div>,
                                        bodyContent: <div>{displayLongText}</div>,
                                        footerContent: (
                                            <a href='/search?filters={"textsearch":"kind%3Acluster%20addon%3Asearch-collector%3Dfalse%20name%3A!local-cluster"}'>
                                                View disabled clusters
                                            </a>
                                        ),
                                    }}
                                />
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
