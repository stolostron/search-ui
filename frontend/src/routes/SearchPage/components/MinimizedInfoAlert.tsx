// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React, { useState, Fragment } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { useTranslation } from 'react-i18next'
import { useGetMessagesQuery, Message } from '../../../search-sdk/search-sdk'
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


export const MinimizedInfoAlert: React.FC = () => {

    const messages = useGetMessagesQuery({
        client: process.env.NODE_ENV === 'test' ? undefined : searchClient})
    //     variables: { 
    //         message: 
    //             [{id:id,
    //             kind:kind,
    //             description: description}]
            
    //     }, }
    

    // const { data } = useQuery<MessageData>(useGetMessagesQuery)
    // const { data } = useQuery<MessageData>(useGetMessagesQuery,
    //     {variables: { id: id }}



    // const result = useGetMessagesQuery({
    //     client: process.env.NODE_ENV === 'test' ? undefined : searchClient,
    // })


    const { t } = useTranslation(['search'])    
    const displayTextShort = t('messages.${messages.id}.short') //this will be the minimized text
    const displayTextLong = t('messages.${messages.id}.long') //this will be onmount

    // const [displayTextLong, setDataState] = useState()  //using useState to have current state and the 


    return(

       <Fragment>
        {/* <AcmLabels 
            collapse={[displayTextShort]}
        /> */}

        <AcmAlert
            noClose={true}
            variant={'info'}
            isInline={true}  
            title={displayTextLong}
        />
        </Fragment>

    )
}  