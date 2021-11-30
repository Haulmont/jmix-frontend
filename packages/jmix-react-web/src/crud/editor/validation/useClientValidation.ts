import { Metadata, isEntityValid, BeanValidationRule, MainStore, useMainStore } from "@haulmont/jmix-react-core";
import { useCallback, useState } from "react";
import { JmixServerValidationErrors } from "../../../common/JmixServerValidationErrors";
import { IntlShape, useIntl } from 'react-intl';

const validationResultToFieldErrors = (
    invalidFieldRules: Map<string, BeanValidationRule[]>,
    entityName: string,
    intl: IntlShape,
    mainStore: MainStore
): Map<string, string[]> => {
    const result = new Map();

    invalidFieldRules.forEach((v, k) => {
        result.set(k, v.map(x => {
            const id = `antd.form.beanValidation.${x.name.toLowerCase()}`;
            const fieldName = mainStore?.messages?.[`${entityName}.${k}`];
            
            return intl.formatMessage({ id }, {
                ...x,
                name: fieldName
            });
        }))
    })

    return result;
}

export function useClientValidation(): [
    (values: any, entityName: string, metadata: Metadata) => boolean,
    JmixServerValidationErrors | undefined
] {
    const [errors, setErrors] = useState<JmixServerValidationErrors>();
    const intl = useIntl();
    const mainStore = useMainStore();

    const executeValidation = useCallback(
        (values: any, entityName: string, metadata: Metadata) => {
            const { isValid, invalidFieldRules } = isEntityValid(values, entityName, metadata);

            setErrors(
                isValid
                    ? undefined
                    : { fieldErrors: validationResultToFieldErrors(invalidFieldRules, entityName, intl, mainStore) }
            );

            return isValid;
        },
        [ intl, mainStore ],
    );

    return [
        executeValidation,
        errors
    ];
}
