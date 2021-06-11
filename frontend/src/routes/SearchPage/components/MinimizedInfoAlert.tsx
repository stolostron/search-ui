// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React, { useState } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
// import { useTranslation } from 'react-i18next'
import { Message } from '../../../search-sdk/search-sdk'
import { AcmAlert, AcmAlertInfo} from '@open-cluster-management/ui-components'
import { makeStyles } from '@material-ui/styles'
import { render } from 'react-dom'

// const { t } = useTranslation(['search'])

const useStyles = makeStyles({
    actionGroup: {
        backgroundColor: 'var(--pf-global--BackgroundColor--100)',
        paddingRight: 'var(--pf-c-page__main-section--PaddingRight)',
        paddingLeft: 'var(--pf-c-page__main-section--PaddingLeft)',
        paddingBottom: 'var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom)',
    },
    dropdown: {
        '& ul': {
            right: 'unset !important',
        },
    },
})

interface Props {
    text: string
}

interface MessageBox{
    text: string
}

export const MinimizedInfoAlert: React.FC<Props> = () => {
    const [minimized, empty] = useState<MessageBox>({text:"Message"});
    // const 

    return(
        <div>
        <AcmAlert
        noClose={true}
        variant={'info'}
        isInline={true}  
        title={"Message"}
    /></div>

    )

}
