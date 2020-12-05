import React, { Fragment } from 'react'
import '@patternfly/react-core/dist/styles/base.css'
import { AcmCountCard } from '@open-cluster-management/ui-components'

// getCardActions = (client, data, resultHeader) => {
//     const { locale } = this.context
//     if (cardActions && cardActions.length > 0) {
//         return (
//             <div className={'query-menu-button'}>
//                 <OverflowMenu floatingMenu flipped iconDescription={msgs.get('svg.description.overflowMenu', locale)}>
//                     {cardActions.map((action) => {
//                         if (
//                             !resultHeader ||
//                             (resultHeader && action !== 'modal.actions.remove' && action !== 'modal.actions.edit')
//                         ) {
//                             return (
//                                 <OverflowMenuItem
//                                     data-table-action={action}
//                                     isDelete={action === 'modal.actions.remove'}
//                                     onClick={this.getResourceAction.bind(null, action, client, data)}
//                                     key={action}
//                                     itemText={msgs.get(action, locale)}
//                                 />
//                             )
//                         }
//                     })}
//                 </OverflowMenu>
//             </div>
//         )
//     }
//     return null
// }

const savedSearchCardActions = [
    { text: 'Edit', handleAction: () => console.log('edit action') },
    { text: 'Share', handleAction: () => console.log('share action') },
    { text: 'Delete', handleAction: () => console.log('delete action') },
]

function handleCardClick(searchText: any, cardData: any) {
    console.log('searchText', searchText)
    console.log('cardData', cardData)
}

export default function SearchQueryCard(props: any) {
    console.log('props', props)
    const { loading, id, searchText, description, name, count, hasIcon } = props
    console.log(description)
    if (loading) {
        return <AcmCountCard loading />
    }
    return (
        <AcmCountCard
            key={id}
            cardHeader={{
                hasIcon: hasIcon,
                title: name,
                description: description,
                actions: { ...savedSearchCardActions },
                onActionClick: (e) => {
                    console.log(e.target)
                },
            }}
            onCardClick={() => handleCardClick(searchText, { searchText, description, name, id })}
            count={count}
            countTitle="Results"
        />
    )
}
