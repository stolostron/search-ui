// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React, { useState, Fragment } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { useTranslation } from 'react-i18next'
import { useGetMessagesQuery, Message } from '../../../search-sdk/search-sdk'
import { AcmLabels } from '@open-cluster-management/ui-components'
import { AcmAlert } from '@open-cluster-management/ui-components'
import { empty, gql, useQuery } from '@apollo/client'
import { searchClient } from '../../../search-sdk/search-client'



// type MinimizedMessage = {
//     displayTextShort: string
// }

// type MaximizedMessage = {
//     displayTextLong : string
// }


// //using union type:
// type MessageType = MinimizedMessage | MaximizedMessage

// // const { t } = useTranslation(['search'])    
// // const displayTextShort = t('messages.S20.short')
// // const displayTextLong = t('messages.S20.long') 

// const isMinimizedMessage = (props: MessageType): props is MinimizedMessage => {
//     return "displayTextShort" in props;

// }

// export const MessageComponent = (props: MessageType) => {


//     const messages = useGetMessagesQuery({
//                 client: process.env.NODE_ENV === 'test' ? undefined : searchClient})


//     const { t } = useTranslation(['search'])    
//     const displayTextShort = t('messages.S20.short')
//     const displayTextLong = t('messages.S20.long') 

//     const[message, setMessage] = useState(displayTextLong) //initial state will be the long message


//     if (isMinimizedMessage(props)){
//         return ( <AcmLabels
//                 labels={{
//                 message
//                         }}
//                         /> )
//     } else {
//         return( <AcmAlert
//                 variant={'info'}
//                 isInline={true}  
//                 title={displayTextLong}
//                 noClose={()=>setMessage
//             /> )
//             }

// }

// export type Messages = {
//     description: string
//     id: string
//     kind: string
// }


export const MessageComponent: React.FC<any> = () => {

    const messages = useGetMessagesQuery({
    client: process.env.NODE_ENV === 'test' ? undefined : searchClient})

    //using translations:
    const { t } = useTranslation(['search'])

    const displayTextShort = t('messages.S20.short')
    const displayTextLong = t('messages.S20.long') 

    const[message, setMessage] = useState(displayTextLong) //initial state will be the long message

    if (message === displayTextLong){
    return(
    <AcmAlert
        variant={'info'}
        isInline={true}  
        title={displayTextLong}
        noClose={false}
        /> 
    )
} else {
    return(
        <AcmLabels
        labels={{displayTextShort}}
        />)
}

}
