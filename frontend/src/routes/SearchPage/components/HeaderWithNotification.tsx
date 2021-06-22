// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { useTranslation } from 'react-i18next'
import { AcmPageHeader, AcmInlineStatus, StatusType } from '@open-cluster-management/ui-components'
import { Card, CardBody } from '@patternfly/react-core'

export default function HeaderWithNotification(props: { queryMessages: any[] }) {
    const { t } = useTranslation(['search'])
    const messages: any[] = props.queryMessages

    return (
        <div style={{ outline: 'none', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ flex: 1 }}>
                <AcmPageHeader title={t('search')} />
            </div>

            {messages.map((msg) => {
                const displayShortText = t(`messages.${msg.id}.short`) || msg?.description
                const displayLongText = t(`messages.${msg.id}.long`) || msg?.description
                const footerText = t(`messages.${msg.id}.additional.info`)

                return (
                    <Card key={msg.id + Math.random()} style={{ border: 'none', boxShadow: 'none' }}>
                        <CardBody>
                            <AcmInlineStatus
                                type={StatusType.warning}
                                status={displayShortText}
                                popover={{
                                    headerContent: displayShortText,
                                    bodyContent: displayLongText,
                                    footerContent: (
                                        <a href='/search?filters={"textsearch":"kind%3Acluster%20addon%3Asearch-collector%3Dfalse%20name%3A!local-cluster"}'>
                                            {footerText}
                                        </a>
                                    ),
                                }}
                            />
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}
