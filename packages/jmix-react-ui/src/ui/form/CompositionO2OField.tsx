import React, {useCallback, useContext, useState} from "react";
import {Button} from "antd";
import { observer } from "mobx-react";
import {
  MayHaveId,
  HasId,
  MayHaveInstanceName,
  ScreensContext,
  toIdString,
  useMetadata,
  EntityInstance
} from "@haulmont/jmix-react-core";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {FormattedMessage, useIntl} from "react-intl";
import {openEntityEditorScreen} from "../../util/screen";
import './CompositionFields.less';
import {ant_to_jmixFront} from "../../formatters/ant_to_jmixFront";
import {showDeleteEntityDialog} from "../../crud/common/showDeleteEntityDialog";

export interface CompositionO2OFieldProps {
  value?: MayHaveId;
  onChange?: (value?: this['value']) => void;
  entityName: string;
}

export const CompositionO2OField = observer((props: CompositionO2OFieldProps) => {
  const {entityName, value, onChange} = props;

  const screens = useContext(ScreensContext);
  const metadata = useMetadata();
  const intl = useIntl();

  const [dirty, setDirty] = useState(false);

  const handleUpsertBtnClick = useCallback(
    () => {
      // Creating a nested entity
      if (value == null) {
        openEntityEditorScreen({
          screens,
          entityName,
          onCommit: createOnCommitCallback(setDirty, onChange),
          submitBtnCaption: 'common.ok'
        });
        return;
      }

      // Editing a nested entity
      openEntityEditorScreen({
        screens,
        entityName,
        onCommit: createOnCommitCallback(setDirty, onChange),
        submitBtnCaption: 'common.ok',
        entityInstance: ant_to_jmixFront(value, entityName, metadata)
    });
    },
    [value, screens, entityName, onChange, metadata]
  );

  const handleDeleteBtnClick = useCallback(
    () => {
      if (onChange != null) {
        showDeleteEntityDialog(
          () => onChange(undefined),
          intl,
          value
        );
      }
    },
    [onChange, intl, value]
  );

  return (
    <span>
      <Button type='link'
              onClick={handleUpsertBtnClick}
              className='jmix-composition-field-upsert-btn'
      >
        <UpsertBtnTitle value={value}
                        dirty={dirty}
        />
      </Button>
      {value != null &&
        <DeleteOutlined onClick={handleDeleteBtnClick} />
      }
    </span>
  );
});

interface UpsertBtnTitleProps {
  value?: MayHaveId;
  dirty: boolean;
}

const UpsertBtnTitle = ({value, dirty}: UpsertBtnTitleProps) => {
  if (value == null) {
    // When there is no nested entity the button will read "Create a new entity"
    return (
      <span>
        <PlusOutlined />
        <FormattedMessage id={'cubaReact.nestedEntityField.create'} />
      </span>
    );
  }

  // TODO get rid of `dirty` flag and put the client-side constructed name into _instanceName
  if (dirty) {
    // When the nested entity has been created/edited but parent entity hasn't been saved yet,
    // the button will read "(unsaved entity)".
    // The reason for that is that on frontend we don't know how to construct `_instanceName`
    // from the changed attributes.
    // In future we will need to replace this with a code that will construct `_instanceName`.
    // TODO https://github.com/Haulmont/jmix-frontend/issues/289
    return <FormattedMessage id='common.unsavedEntity' />;
  }

  // Otherwise the button will contain _instanceName or, when it is missing, the id
  const fetchedValue = value as HasId & MayHaveInstanceName;
  return (
    <>
      {fetchedValue._instanceName ?? toIdString(fetchedValue.id)}
    </>
  );
};

function createOnCommitCallback(setDirty: (dirty: boolean) => void, onChange?: (value?: MayHaveId) => void): ((value?: MayHaveId) => void) | undefined {
  if (onChange != null) {
    return (value?: EntityInstance) => {
      setDirty(true);
      onChange(value);
    };
  }

  return undefined;
}
