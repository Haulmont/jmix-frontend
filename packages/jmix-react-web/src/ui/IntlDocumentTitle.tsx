import React, { useEffect } from 'react';
import { useIntl } from 'react-intl'
import { registerTitleFormatter, clearTitleFormatter } from '@haulmont/jmix-react-core'

export const IntlDocumentTitle = ({ children }: {
    children: React.ReactNode | React.ReactNode[] | null;
}) => {
    const {formatMessage} = useIntl();

    useEffect(() => {
        registerTitleFormatter(
            (caption: string) => formatMessage({id: caption, defaultMessage: caption})
        )
        return () => {
            clearTitleFormatter()
        }
    }, [])
    
    return <>{children}</>
}
