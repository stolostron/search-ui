// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import React, { useState, Fragment, cloneElement } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { useTranslation } from 'react-i18next'
import { useGetMessagesQuery, Message } from '../../../search-sdk/search-sdk'
import { AcmButton, AcmDrawer, AcmLabels, AcmPageHeader } from '@open-cluster-management/ui-components'
import { AcmAlert } from '@open-cluster-management/ui-components'
import { empty, gql, useQuery } from '@apollo/client'
import { searchClient } from '../../../search-sdk/search-client'
import { printIntrospectionSchema } from 'graphql'



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


export const HeaderWithNotification: React.FC<any> = () => {

    const messages = useGetMessagesQuery({
    client: process.env.NODE_ENV === 'test' ? undefined : searchClient})

    //using translations:
    const { t } = useTranslation(['search'])

    const displayTextShort = t('messages.S20.short')
    const displayTextLong = t('messages.S20.long') 

//     const[message, setMessage] = useState<string>(displayTextLong) //initial state to long text


//     const minimizedMessage = () => setMessage(displayTextShort) 
//     const maximizedMessage = () => setMessage(displayTextLong)

//     const toggleMessage = () =>  setMessage(message => !maximizedMessage) //setMessage will 

//         return (
            
//             <AcmPageHeader title={"Search"}/>
           
//             message.length >0 && minimizedMessage ? <AcmLabels labels={{displayTextShort}}/> : ''
//             message.length >0 && maximizedMessage ? <AcmAlert title={displayTextLong} onClose={toggleMessage}/> : ''
         
//         )
// }

    const[message, setMessage] = useState<string>(displayTextLong) //initial state to long text
    const toggleMessage = () =>  setMessage(message === displayTextLong ? displayTextShort : displayTextLong) //setMessage will
        return (
        <AcmPageHeader title={"Search"}/>
        message === displayTextShort && <AcmLabels labels={{displayTextShort}}/>
        message === displayTextLong &&  <AcmAlert title={displayTextLong} onClose={toggleMessage}/>
    )
}



// React.cloneElement(AcmAlert,
    //     [])

    // const [isExpanded, setIsExpanded] = useState<boolean>(false)
    // const [labels, setLabels] = useState<Record<string, string>>({
   
    // })


        // <AcmAlert
        //         variant={'info'}
        //         isInline={true}  
        //         title={message}
        //         noClose={false}
        //         /> 




//             <AcmDrawer
                
//                 title="Edit Labels"
//                 isExpanded={isExpanded}
//                 setMessageClick={() => setIsExpanded(false)}
//                 panelContent={displayTextLong}
// >
//                 <div style={{ height: '1.5vh'}}>
//                     <AcmButton onClick={() => setIsExpanded(!isExpanded)}>Open drawer</AcmButton>
//                 </div>

//                 </AcmDrawer>
            
    


//     if (message === displayTextLong){
//     return(
//     <AcmAlert
//         variant={'info'}
//         isInline={true}  
//         title={setMessage}
//         noClose={false}
//         onClick={}
//         /> 
//     )
// } else if (message === displayTextShort){
//     return(
//     <AcmLabels
//         labels={{displayTextShort}}
//         />)
// } else {
//     return()
// }

// }
