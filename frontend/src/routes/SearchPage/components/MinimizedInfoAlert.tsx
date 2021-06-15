// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React, { useState, Fragment } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { useTranslation } from 'react-i18next'
import { useGetMessagesQuery } from '../../../search-sdk/search-sdk'
import { AcmLabels } from '@open-cluster-management/ui-components'
import { AcmAlert } from '@open-cluster-management/ui-components'
import { gql, useQuery } from '@apollo/client'
import { searchClient } from '../../../search-sdk/search-client'
// type Actions = 
// | { type: "show"; data: Message }
// | { type: "minimize"; data:null }

// interface Props {
//     data: Message
// }

// interface Message {
//     id:string,
//     kind:string,
//     description:string
// }

// interface MessageData {
//     messages: Message[];
//   }
type MessageSate = {
    currentIndex: number
}



export const MinimizedInfoAlert: React.FC = () => {

    const messages = useGetMessagesQuery({
        client: process.env.NODE_ENV === 'test' ? undefined : searchClient})
 


    const { t } = useTranslation(['search'])    
    // const displayTextShort = t('messages.S20.short') 
    // const displayTextLong = t('messages.S20.long') 

    const displayOptions: string[] = [t('messages.${messages[0].id}.short'), t('messages.S20.long')] //index 0 short index 1 long


    const [displayTextLong, setDataState] = useState()  //using useState to have current state and the 
    console.log('Messages:', messages)

    return(

       <Fragment>
        <AcmLabels
            labels={{
                 display: displayOptions[0]
            }}
            // collapse ={['display']}
        />

        {/* <AcmAlert
            noClose={true}
            variant={'info'}
            isInline={true}  
            title={displayTextLong}
        /> */}
        </Fragment>

    )
}  




// title={
//     schemaError?.message.includes('not enabled') || completeError?.message.includes('not enabled')
//         ? t('search.filter.info.title')
//         : t('search.filter.errors.title')
// }