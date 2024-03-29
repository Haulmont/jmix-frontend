import * as React from "react";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {
  getEnumCaption,
  getPropertyInfo,
  useMetadata,
  injectMainStore,
  MainStoreInjected,
  MetaPropertyInfo
} from "@haulmont/jmix-react-core";
import {toDisplayValue} from '../../util/formatting';
import styles from "./EntityPropery.module.less";

export interface EntityPropertyProps extends MainStoreInjected {
  entityName: string;
  propertyName: string;
  /**
   * Whether to show a localized property name as a label. Default: true.
   */
  showLabel?: boolean;
  /**
   * If `true`, the component will render as `null` when {@link value} is `null` or `undefined`
   */
  hideIfEmpty?: boolean;
  /**
   * Property value
   */
  value: any;
}

const EntityPropertyFormattedValue = observer((props: EntityPropertyProps) => {
  const {
    entityName,
    propertyName,
    value,
    showLabel = true,
    hideIfEmpty = true,
    mainStore,
  } = props;

  const metadata = useMetadata()

  if (hideIfEmpty && value == null) {
    return null;
  }
  if (!showLabel) {
    return <div>{formatValue(toJS(value))}</div>;
  }

  // store not ready yet
  if (!mainStore || !mainStore.messages) {
    return null;
  }

  const propertyFullName = entityName + '.' + propertyName;
  const label: string = mainStore.messages[propertyFullName];

  const propertyInfo: MetaPropertyInfo | null = getPropertyInfo(
    metadata.entities,
    entityName,
    propertyName);

  if (!propertyInfo) {
    throw new Error('Cannot find MetaPropertyInfo for property ' + propertyFullName);
  }

  const displayValue = propertyInfo.attributeType === 'ENUM'
    ? getEnumCaption(value, propertyInfo, metadata.enums, mainStore.enumMessages)
    : toDisplayValue(toJS(value), propertyInfo);

  return label != null
    ? <div className={styles.propertyContainer}>
        <strong>{label}:&nbsp;</strong> {formatValue(displayValue)}
      </div>
    : <div>{formatValue(displayValue)}</div>
});

export const EntityProperty = injectMainStore(observer((props: EntityPropertyProps) =>
  <EntityPropertyFormattedValue {...props}/>));

function formatValue(value: any): string {
  const valType = typeof value;
  if (valType === "string") {
    return value;
  }
  if (valType === "object") {
    if (Object.prototype.hasOwnProperty.call(value, '_instanceName')) {
      return value._instanceName ?? value.id;
    }
    if (Array.isArray(value)) {
      const items = value.map(formatValue);
      return items.join(", ");
    }
  }
  return JSON.stringify(value);
}
