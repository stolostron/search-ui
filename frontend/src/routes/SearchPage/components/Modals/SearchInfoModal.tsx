import '@patternfly/react-core/dist/styles/base.css'
import React, { Fragment } from 'react'
import { AcmButton, AcmLabels, AcmModal } from '@stolostron/ui-components'
import { makeStyles } from '@material-ui/styles'
import { ButtonVariant } from '@patternfly/react-core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
    root: {
        '& h1, h2': {
            fontFamily: 'RedHatDisplay',
        },
        '& hr': {
            width: 'calc(100% + 50px)',
            margin: '1.2rem -25px',
        },
        '& div > p:first-child': {
            marginBottom: '1rem',
        },
        '& ul': {
            marginInlineStart: '2rem',
            listStyle: 'unset',
            '& li': {
                marginBottom: '0.5rem',
            },
        },
    },
    exampleRow: {
        display: 'flex',
        alignItems: 'center',
        '& p': {
            paddingLeft: '1rem',
            fontSize: 'var(	--pf-global--FontSize--sm)',
        },
        '& > span': {
            width: '2.8rem',
            margin: '0.4rem 0 !important',
            fontSize: 'var(--pf-global--FontSize--xs)',
            backgroundColor: 'var(--pf-global--palette--blue-50)',
            color: 'var(--pf-global--info-color--200)',
        },
    },
})
export const SearchInfoModal = (props: any) => {
    const { t } = useTranslation(['search'])
    const classes = useStyles()
    return (
        <Fragment>
            <AcmModal
                className={classes.root}
                title={t('search.modal.info.title')}
                width={'50%'}
                onClose={props.onClose}
                isOpen={props.isOpen}
                actions={[
                    <AcmButton key="close" variant={ButtonVariant.primary} onClick={props.onClose}>
                        {t('search.modal.info.action.cancel')}
                    </AcmButton>,
                ]}
            >
                <div>
                    <h2>{t('search.modal.info.subtitle')}</h2>
                </div>
                <hr />
                <div>
                    <p>{t('search.modal.info.keyword.section.title')}</p>
                    <div className={classes.exampleRow}>
                        <AcmLabels labels={['Type']} />
                        <p>OpenShift</p>
                    </div>
                    <div className={classes.exampleRow}>
                        <AcmLabels labels={['Show']} />
                        <p>{t('search.modal.info.keyword.section.desc')}</p>
                    </div>
                </div>
                <hr />
                <div>
                    <p>{t('search.modal.info.property.section.title')}</p>
                    <div className={classes.exampleRow}>
                        <AcmLabels labels={['Type']} />
                        <p>status: failed,pending</p>
                    </div>
                    <div className={classes.exampleRow}>
                        <AcmLabels labels={['Show']} />
                        <p>{t('search.modal.info.property.section.desc')}</p>
                    </div>
                </div>
                <hr />
                <div>
                    <p>{t('search.modal.info.additional.info')}</p>
                    <ul>
                        <li>{t('search.modal.info.additional.info.1')}</li>
                        <li>{t('search.modal.info.additional.info.2')}</li>
                    </ul>
                </div>
            </AcmModal>
        </Fragment>
    )
}
