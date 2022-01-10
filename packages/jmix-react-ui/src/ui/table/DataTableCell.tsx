import {Checkbox, Button, Popover} from 'antd';
import React, {ReactNode} from 'react';
import {SerializedEntityProps} from '@haulmont/jmix-rest';
import { MainStoreInjected, MainStore, getEnumCaption, useMetadata, useMainStore, MetaPropertyInfo, PropertyType } from '@haulmont/jmix-react-core';
import { toDisplayValue } from '../../util/formatting';
import {FormattedMessage} from "react-intl";

type DataTableCellProps<EntityType> = MainStoreInjected & {
  text: any,
  propertyInfo: MetaPropertyInfo,
  mainStore: MainStore,
  record?: EntityType
}

export const DataTableCell = <EntityType extends unknown>(props: DataTableCellProps<EntityType>): ReactNode => {

  const {type, attributeType, cardinality, name} = props.propertyInfo;

  if ((type as PropertyType) === 'Boolean') {
    return (
      <Checkbox
        checked={props.text as boolean}
        disabled={true}
      />
    );
  }

  if (attributeType === 'ENUM') {
    return (
      <EnumCell text={props.text} propertyInfo={props.propertyInfo} mainStore={props.mainStore!}/>
    );
  }

  if (attributeType === 'ASSOCIATION' && (cardinality === 'MANY_TO_MANY' || cardinality === 'ONE_TO_MANY') ||
    attributeType === 'COMPOSITION' && cardinality === 'ONE_TO_MANY') {
    const associatedEntities = props.record?.[name as keyof EntityType] as unknown as SerializedEntityProps[];
    const quantity = associatedEntities.length;
    const content = <>
      {associatedEntities.map((entity, idx) => <div key = {idx}>
        {entity._instanceName}
      </div>)}
    </>

    if (quantity > 2) {
      return <Popover content={content}>
        <Button type="link" style = {{ margin: 0 }}>
          <FormattedMessage id="jmix.nestedEntityField.xEntities" values={{ quantity }}/>
        </Button>
      </Popover>
    }

    const displayValue = associatedEntities?.map(entity => entity._instanceName).join(', ');

    return (
      <div>{displayValue}</div>
    );
  }

  return (
    <div>{toDisplayValue(props.text, props.propertyInfo)}</div>
  );
};

const EnumCell = <EntityType extends unknown>(props: DataTableCellProps<EntityType>) => {
  const metadata = useMetadata();
  const mainStore = useMainStore();
  const caption = getEnumCaption(props.text, props.propertyInfo, metadata.enums, mainStore.enumMessages);
  return <div>{caption ? caption : ''}</div>;
};
