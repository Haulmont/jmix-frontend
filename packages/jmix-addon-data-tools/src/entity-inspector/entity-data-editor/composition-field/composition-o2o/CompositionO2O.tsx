import React, { useCallback, useState } from "react";
import { EntityInstance, HasId, MayHaveId, MayHaveInstanceName, toIdString, useMetadata } from "@haulmont/jmix-react-core";
import { ant_to_jmixFront, showDeleteEntityDialog } from "@haulmont/jmix-react-antd";
import { getAllEntityPropertyNames } from "../../../EntityInspector.helpers";
import { Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { CompositionComponentProps } from "../CompositionField";
import { observer } from "mobx-react";

interface UpsertBtnTitleProps {
  value?: MayHaveId;
  dirty: boolean;
}

export const CompositionO2O = observer((props: CompositionComponentProps) => {
  const {
    attrInfo, 
    parentEntityName, 
    value,  
    onChange, 
    screensControl, 
    routingPath, 
    entityNamesInfo
  } = props;

  const {openEditorScreen} = screensControl;

  const metadata = useMetadata();
  const intl = useIntl();

  const [dirty, setDirty] = useState(false);

  const onCommit = useCallback((value?: EntityInstance) => {
    setDirty(true);
    onChange?.(value);
  }, [setDirty, onChange]);

  const handleUpsertBtnClick = useCallback(() => {
    openEditorScreen({
      screensControl,
      entityAttrs: getAllEntityPropertyNames(attrInfo.type, metadata),
      entityNamesInfo,
      routingPath,
      onCommit,
      entityInstance: value ? ant_to_jmixFront(value, parentEntityName, metadata) : undefined
    }, `${attrInfo.name} edit`);
  },[parentEntityName, value, onChange, setDirty])

  const handleDeleteBtnClick = useCallback(() => {
    showDeleteEntityDialog(
      () => onChange?.(undefined),
      intl,
      value as MayHaveId
    );
  } ,[onChange, intl, value]);

  return (
    <span className='jmix-composition-field'>
      <Button 
        type='link'
        onClick={handleUpsertBtnClick}
        className='jmix-composition-field-upsert-btn'
      >
        <UpsertBtnTitle 
          value={value as MayHaveId}
          dirty={dirty}
        />
      </Button>
      {value != null &&
        <DeleteOutlined onClick={handleDeleteBtnClick} />
      }
    </span>
  )
});

const UpsertBtnTitle = ({value, dirty}: UpsertBtnTitleProps) => {
  if (value == null) {
    return (
      <span>
        <PlusOutlined />
        <FormattedMessage id={'jmix.nestedEntityField.create'} />
      </span>
    );
  }
  if (dirty) {
    return <FormattedMessage id='common.unsavedEntity' />;
  }

  const fetchedValue = value as HasId & MayHaveInstanceName;
  return (
    <>
      {fetchedValue._instanceName ?? toIdString(fetchedValue.id)}
    </>
  );
};
