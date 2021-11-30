import { BeanValidationRule, MetaClassInfo, Metadata } from "../app/MetadataProvider";
import { findEntityMetadata } from "../util/metadata";
import { isNull } from "../util/isNull";
import dayjs from 'dayjs'

interface EntityValidationResult {
    isValid: boolean;
    invalidFieldRules: Map<string, BeanValidationRule[]>;
}

interface AttrValidationResult {
    isValidAttr: boolean;
    invalidRules: BeanValidationRule[];
}

const defaultAttrValidResult = { isValidAttr: true, invalidRules: [] }
const defaultItemValidResult = { isValid: true, invalidFieldRules: new Map() }

export const isEntityValid = (
    values: any,
    entityName: string,
    metadata: Metadata
): EntityValidationResult => {
    const entityMetadata: MetaClassInfo | undefined = findEntityMetadata(entityName, metadata);

    return entityMetadata?.properties.reduce((result: EntityValidationResult, attr) => {
        const { isValidAttr, invalidRules } = attr.beanValidationRules?.reduce((rulesValidResult: AttrValidationResult, rule) => {
            const isValid = isValidValueForRule(values[ attr.name ], rule, attr.type);

            if (!isValid) {
                rulesValidResult.isValidAttr = false;
                rulesValidResult.invalidRules.push(rule);
            }

            return rulesValidResult;
        }, defaultAttrValidResult) ?? defaultAttrValidResult;

        if (!isValidAttr) {
            result.isValid = false;
            result.invalidFieldRules.set(attr.name, invalidRules);
        }

        return result;
    }, defaultItemValidResult) ?? defaultItemValidResult
}

export function isValidValueForRule(value: any, rule: BeanValidationRule, dataType?: string) {
    switch (rule.name) {
        case 'Email': {
            const defaultRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return isNull(value) || new RegExp(rule.regexp || defaultRegexp, rule.modifiers).test(String(value).toLowerCase());
        }
        case "Digits": {
            if (isNull(value)) {
                return true;
            }
            
            const [integer, fraction] = String(value).split('.');

            return (integer?.length || 0) <= rule.integer && (fraction?.length || 0) <= rule.fraction;
        }
        case "DecimalMax":
        case 'Max': {
            return isNull(value) || Number(value) <= Number(rule.value);
        }
        case "DecimalMin":
        case 'Min': {
            return isNull(value) || Number(value) >= Number(rule.value);
        }
        case 'Negative': {
            return isNull(value) || Number(value) < 0;
        }
        case 'NegativeOrZero': {
            return isNull(value) || Number(value) <= 0;
        }
        case 'Positive': {
            return isNull(value) || Number(value) > 0;
        }
        case 'PositiveOrZero': {
            return isNull(value) || Number(value) >= 0;
        }
        case 'NotBlank': {
            return !isNull(value) && !!String(value).trim();
        }
        case 'NotEmpty': {
            return !isNull(value) && !!String(value);
        }
        case 'NotNull': {
            return !isNull(value);
        }
        case 'Past': {
            if (isNull(value)) {
                return true;
            }

            switch (dataType) {
                case 'DateTime':
                case 'LocalDateTime':
                case 'OffsetDateTime':
                    return dayjs(value).isBefore(new Date());
                case 'Date':
                case 'LocalDate': {
                    return dayjs(value).isBefore(new Date(), 'date');
                }
                case 'Time':
                case 'LocalTime':
                case 'OffsetTime': {
                    const now = dayjs();
                    const nowSeconds = now.hour() * 60 * 60 + now.minute() * 60 + now.second();
                    const valSeconds = value.hour() * 60 * 60 + value.minute() * 60 + value.second();

                    return valSeconds < nowSeconds;
                }
                default: throw new Error('Not implemented');
            }
        }
        case 'PastOrPresent': {
            if (isNull(value)) {
                return true;
            }

            switch (dataType) {
                case 'DateTime':
                case 'LocalDateTime':
                case 'OffsetDateTime':
                    return dayjs(value).isBefore(dayjs()) || dayjs(value).isSame(dayjs());
                case 'Date':
                case 'LocalDate': {
                    return dayjs(value).isBefore(dayjs(), 'date') || dayjs(value).isSame(dayjs(), 'date');
                }
                case 'Time':
                case 'LocalTime':
                case 'OffsetTime': {
                    const now = dayjs();
                    const nowSeconds = now.hour() * 60 * 60 + now.minute() * 60 + now.second();
                    const valSeconds = value.hour() * 60 * 60 + value.minute() * 60 + value.second();

                    return valSeconds <= nowSeconds;
                }
                default: throw new Error('Not implemented');
            }
        }
        case 'Future': {
            if (isNull(value)) {
                return true;
            }

            switch (dataType) {
                case 'DateTime':
                case 'LocalDateTime':
                case 'OffsetDateTime':
                    return dayjs(value).isAfter(new Date());
                case 'Date':
                case 'LocalDate': {
                    return dayjs(value).isAfter(new Date(), 'date');
                }
                case 'Time':
                case 'LocalTime':
                case 'OffsetTime': {
                    const now = dayjs();
                    const nowSeconds = now.hour() * 60 * 60 + now.minute() * 60 + now.second();
                    const valSeconds = value.hour() * 60 * 60 + value.minute() * 60 + value.second();

                    return valSeconds > nowSeconds;
                }
                default: throw new Error('Not implemented');
            }
        }
        case 'FutureOrPresent': {
            if (isNull(value)) {
                return true;
            }

            switch (dataType) {
                case 'DateTime':
                case 'LocalDateTime':
                case 'OffsetDateTime':
                    return dayjs(value).isAfter(dayjs()) || dayjs(value).isSame(dayjs());
                case 'Date':
                case 'LocalDate': {
                    return dayjs(value).isAfter(dayjs(), 'date') || dayjs(value).isSame(dayjs(), 'date');
                }
                case 'Time':
                case 'LocalTime':
                case 'OffsetTime': {
                    const now = dayjs();
                    const nowSeconds = now.hour() * 60 * 60 + now.minute() * 60 + now.second();
                    const valSeconds = value.hour() * 60 * 60 + value.minute() * 60 + value.second();

                    return valSeconds >= nowSeconds;
                }
                default: throw new Error('Not implemented');
            }
        }
        case 'Pattern': {
            if (isNull(value)) {
                return true;
            }

            const matches = String(value).match(new RegExp(rule.regexp, rule.modifiers));

            return matches?.length === 1 && matches[0].length === String(value).length;
        }
        case 'Size': {
            return isNull(value) || (typeof value === 'string' || Array.isArray(value)) && value.length >= rule.min && value.length <= rule.max;
        }
        default: throw new Error('Not implemented');
    }
}
