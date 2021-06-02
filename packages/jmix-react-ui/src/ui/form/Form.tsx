import {
  DataCollectionStore,
  getPropertyInfo,
  injectMainStore,
  isByteArray,
  isFileProperty, isOneToManyAssociation,
  MainStoreInjected,
  WithId,
  HasId,
  MayHaveInstanceName,
  useMetadata,
  EnumInfo,
  MetaClassInfo,
  MetaPropertyInfo,
  Cardinality,
} from '@haulmont/jmix-react-core';
import { FormItemProps } from 'antd/es/form';
import {observer} from 'mobx-react';
import {Msg} from '../Msg';
import {FieldPermissionContainer} from './FieldPermssionContainer';
import {
  Checkbox,
  Input,
  Select,
  Form,
  FormInstance, message,
} from 'antd';
import {
  CommitMode,
  JmixRestError,
  PropertyType,
} from '@haulmont/jmix-rest';
import {uuidPattern} from '../../util/regex';
import * as React from 'react';
import {SelectProps, SelectValue} from 'antd/es/select';
import {InputProps} from 'antd/es/input/Input';
import {InputNumberProps} from 'antd/es/input-number';
import {CheckboxProps} from 'antd/es/checkbox/Checkbox';
import {FileUpload, FileUploadProps} from '../FileUpload';
import {EntitySelectField} from '../EntitySelectField';
import {IntegerInput} from './IntegerInput';
import {DoubleInput} from './DoubleInput';
import {LongInput} from './LongInput';
import {BigDecimalInput} from './BigDecimalInput';
import {UuidInput} from './UuidInput';
import {CharInput} from "./CharInput";
import {DataInstanceStore} from "@haulmont/jmix-react-core";
import { IntlShape } from 'react-intl';
import {clearFieldErrors, constructFieldsWithErrors, extractServerValidationErrors} from "../../util/errorHandling";
import {defaultMapJmixRestErrorToIntlId, mapJmixRestErrorToIntlId} from "../../util/mapJmixRestErrorToIntlId";
import { DatePicker, DatePickerProps } from '../DatePicker';
import { TimePicker, TimePickerProps } from '../TimePicker';
import { CompositionO2OField, CompositionO2OFieldProps } from './CompositionO2OField';
import {CompositionO2MField, CompositionO2MFieldProps } from './CompositionO2MField';

export interface FieldProps {
  entityName: string;
  propertyName: string;
  /**
   * It is a data collection containing entity instances that can be assigned to this property
   * (i.e. possible options that can be selected in a form field).
   *
   * @deprecated use {@link associationOptions}
   */
  optionsContainer?: DataCollectionStore<WithId>;
  /**
   * Contains the possible options that can be selected in a form field.
   */
  associationOptions?: Array<HasId & MayHaveInstanceName>;
  /**
   * This prop shall be supplied if the entity property has One-to-Many Composition relation type.
   * It is an id of the enclosing entity instance.
   */
  parentEntityInstanceId?: string;
  /**
   * When `true`, the field will be non-editable.
   */
  disabled?: boolean;
  /**
   * Props that will be passed through to {@link https://ant.design/components/form/ | Form.Item} component.
   */
  formItemProps?: FormItemProps;
  /**
   * Props that will be passed through to the underlying component (i.e. the actual component
   * that will be rendered, such as `DatePicker` or `Select`).
   */
  componentProps?: FormFieldComponentProps;
}

// noinspection JSUnusedGlobalSymbols
export const Field = observer((props: FieldProps) => {

  const {
    entityName, propertyName, optionsContainer, associationOptions, componentProps,
    parentEntityInstanceId, disabled, formItemProps
  } = props;

  const metadata = useMetadata();

  return (
    <FieldPermissionContainer entityName={entityName} propertyName={propertyName} renderField={(isReadOnly: boolean) => {

      return <Form.Item {...{...getDefaultFormItemProps(metadata.entities, entityName, propertyName), ...formItemProps}}>
        <FormField entityName={entityName}
                   propertyName={propertyName}
                   disabled={isReadOnly || disabled}
                   optionsContainer={optionsContainer}
                   associationOptions={associationOptions}
                   parentEntityInstanceId={parentEntityInstanceId}
                   {...componentProps}
        />
      </Form.Item>

    }}/>);

});

function getDefaultFormItemProps(entitiesMetadata: MetaClassInfo[], entityName: string, propertyName: string): FormItemProps {
  const formItemProps: FormItemProps = {
    name: propertyName,
    label: <Msg entityName={entityName} propertyName={propertyName}/>
  };

  const propertyInfo = getPropertyInfo(entitiesMetadata, entityName, propertyName);

  if (propertyInfo?.type === 'uuid') {
    formItemProps.rules = [
        { pattern: uuidPattern }
      ];
    formItemProps.validateTrigger = 'onSubmit';
  }

  return formItemProps;
}

export type FormFieldComponentProps = SelectProps<SelectValue> | InputProps | InputNumberProps | CheckboxProps | DatePickerProps | TimePickerProps | FileUploadProps;

// TODO We should probably make it an interface as it is not convenient to document type declarations with TSDoc.
// TODO However, that would be a minor breaking change, as interface cannot extend FormFieldComponentProps.
/**
 * See {@link FieldProps}
 */
export type FormFieldProps = MainStoreInjected & {
  entityName: string;
  propertyName: string;
  disabled?: boolean;
  optionsContainer?: DataCollectionStore<WithId>;
  associationOptions?: Array<HasId & MayHaveInstanceName>;
  nestedEntityView?: string;
  parentEntityInstanceId?: string;
} & FormFieldComponentProps;

// forwardRef is required to avoid a console warning
// as Form.Item will attempt to pass a ref
export const FormField = injectMainStore(observer(React.forwardRef((props: FormFieldProps, _ref: any) => {

  const {
    entityName, propertyName, optionsContainer, associationOptions, mainStore, nestedEntityView, parentEntityInstanceId,
    ...rest
  } = props;

  const metadata = useMetadata();

  if (mainStore == null) {
    return <Input {...(rest as InputProps)}/>;
  }
  const propertyInfo = getPropertyInfo(metadata.entities, entityName, propertyName);
  if (propertyInfo == null) {
    return <Input {...(rest as InputProps)}/>
  }

  if (isFileProperty(propertyInfo)) {
    return <FileUpload {...(rest as FileUploadProps)}/>;
  }

  switch (propertyInfo.attributeType) {
    case 'ENUM':
      return <EnumField enumClass={propertyInfo.type} allowClear={getAllowClear(propertyInfo)} {...rest as SelectProps<SelectValue> & MainStoreInjected}/>;
    case 'ASSOCIATION':
      const mode = getSelectMode(propertyInfo.cardinality);
      return <EntitySelectField {...{mode, optionsContainer, associationOptions}} allowClear={getAllowClear(propertyInfo)} {...rest}/>;
    case 'COMPOSITION':
      const nestedEntityName = metadata.entities
        .find((metaClass: MetaClassInfo) => metaClass.entityName === entityName) // Find parent entity
        ?.properties
        .find((property: MetaPropertyInfo) => property.name === propertyName) // Find the nested entity attribute
        ?.type; // Get nested entity name

      if (nestedEntityName) {
        if (propertyInfo.cardinality === 'ONE_TO_ONE') {
          return <CompositionO2OField entityName={nestedEntityName}
                                      {...rest as Partial<CompositionO2OFieldProps>}
                 />;
        }

        if (propertyInfo.cardinality === 'ONE_TO_MANY') {
          return <CompositionO2MField entityName={nestedEntityName}
                                      {...rest as Partial<CompositionO2MFieldProps>}
                 />;
        }
      }

      return null;
  }
  switch (propertyInfo.type as PropertyType) {
    case 'boolean':
      return <Checkbox {...(rest as CheckboxProps)}/>;
    case 'date':
    case 'localDate':
      return <DatePicker {...(rest as DatePickerProps)}/>;
    case 'dateTime':
    case 'localDateTime':
    case 'offsetDateTime':
      return <DatePicker showTime={true} {...(rest as DatePickerProps & {showTime?: boolean | object})}/>;
    case 'time':
    case 'localTime':
    case 'offsetTime':
      return <TimePicker {...(rest as TimePickerProps)}/>;
    case 'int':
      return <IntegerInput {...(rest as InputNumberProps)}/>;
    case 'double':
      return <DoubleInput {...(rest as InputNumberProps)}/>;
    case 'long':
      return <LongInput {...(rest as InputNumberProps)}/>;
    case 'decimal':
      return <BigDecimalInput {...(rest as InputNumberProps)}/>;
    case 'uuid':
      return <UuidInput {...(rest as InputProps)}/>
    case 'char':
      return <CharInput {...(rest as InputProps)}/>
  }
  return <Input {...(rest as InputProps)}/>;
})));

interface EnumFieldProps extends SelectProps<SelectValue> {
  enumClass: string;
}

export const EnumField = observer(({enumClass, ...rest}: EnumFieldProps) => {
  const metadata = useMetadata();

  const enumInfo = metadata.enums.find((enm: EnumInfo) => enm.name === enumClass);
  const enumValues: EnumInfo['values']= enumInfo?.values || []

  return <Select {...rest} >
    {enumValues.map((enumValue) =>
      <Select.Option key={enumValue.name} value={enumValue.name}>{enumValue.caption}</Select.Option>
    )}
  </Select>
});

function getSelectMode(cardinality: Cardinality): "default" | "multiple" {
  if (cardinality === "ONE_TO_MANY" || cardinality === "MANY_TO_MANY") {
    return "multiple"
  }
  return "default";
}

function getAllowClear(propertyInfo: MetaPropertyInfo): boolean {
  return !propertyInfo.mandatory;
}

export function selectFormSuccessMessageId(commitMode?: CommitMode): string {
  switch (commitMode) {
    case 'create': return "management.editor.created";
    case 'edit': return "management.editor.updated";
    default: return "management.editor.updated";
  }
}

function selectFormErrorMessageId(globalErrors: string[], fieldErrors: Map<string, string[]>): string | void {
  if (fieldErrors.size > 0 || globalErrors.length > 0) {
    return "management.editor.validationError";
  }
}

export const defaultHandleFinish = <E extends unknown>(
  values: Record<string, any>,
  dataInstance: DataInstanceStore<E>,
  intl: IntlShape,
  formInstance: FormInstance,
  commitMode?: CommitMode,
): Promise<{success: boolean, globalErrors: string[]}> => {
  clearFieldErrors(formInstance);

  return dataInstance
    .update(values, commitMode)
    .then(() => {
      const successMessageId = selectFormSuccessMessageId(commitMode);
      message.success(intl.formatMessage({id: successMessageId}));

      return {success: true, globalErrors: []};
    })
    .catch((serverError: JmixRestError) => {
      if (serverError.response && typeof serverError.response.json === "function") {
        return serverError.response.json().then((response: any) => {
          const {globalErrors, fieldErrors} = extractServerValidationErrors(response);
          if (fieldErrors.size > 0) {
            formInstance.setFields(constructFieldsWithErrors(fieldErrors, formInstance));
          }

          const errorMessageId = mapJmixRestErrorToIntlId(
            () => selectFormErrorMessageId(globalErrors, fieldErrors),
            serverError,
          )
          message.error(intl.formatMessage({id: errorMessageId}));

          return {success: false, globalErrors};
        });
      } else {
        message.error(
          intl.formatMessage({ id: defaultMapJmixRestErrorToIntlId(serverError) })
        );
        return {success: false, globalErrors: []};
      }
    });
};

export function getEntityProperties(entityName: string, fields: string[], metadata: MetaClassInfo[]): MetaPropertyInfo[] {
  const allProperties = metadata.find((classInfo: MetaClassInfo) => classInfo.entityName === entityName)
    ?.properties || [];

  return allProperties.filter((property: MetaPropertyInfo) => {
    return (fields.indexOf(property.name) > -1) && isDisplayedProperty(property);
  });
}

function isDisplayedProperty(property: MetaPropertyInfo): boolean {
  return !isOneToManyAssociation(property)
    && !isByteArray(property);
}
