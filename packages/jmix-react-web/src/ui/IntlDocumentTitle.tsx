import React, { useEffect } from 'react';
import { useIntl } from 'react-intl'
import { registerTitleFormatter, clearTitleFormatter, useMainStore } from '@haulmont/jmix-react-core'

export const IntlDocumentTitle = ({ children }: {
    children: React.ReactNode | React.ReactNode[] | null;
}) => {
    const {formatMessage} = useIntl();
    const mainStore = useMainStore()

    useEffect(() => {
        registerTitleFormatter(
            (caption: string) => formatMessage({id: caption, defaultMessage: caption})
        )
        return () => {
            clearTitleFormatter()
        }
    }, [mainStore.locale])
    
    return <>{children}</>
}
