import React, { useCallback, useContext } from "react";
import { observer } from "mobx-react";
import {MayHaveId, MayHaveInstanceName, ScreensContext, toIdString} from "@haulmont/jmix-react-core";
import {Button} from "antd";
import './CompositionFields.less';
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {PlusOutlined} from "@ant-design/icons";
import {openEntityListScreen} from "../../util/screen";

export interface CompositionO2MFieldProps {
  value?: MayHaveId[];
  onChange?: (value?: this['value']) => void;
  entityName: string;
  parentEntityAttrName: string;
  parentEntityId: string | object;
}

export const CompositionO2MField = observer((props: CompositionO2MFieldProps) => {
  const {value, entityName, onChange, parentEntityAttrName, parentEntityId} = props;

  const screens = useContext(ScreensContext);

  const handleClick = useCallback(() => {
    openEntityListScreen({
      entityName,
      entityList: value ?? [],
      screens,
      onEntityListChange: onChange, // TODO decouple from ant
      parentEntityAttrName,
      parentEntityId
    });
  }, [entityName, value, screens, onChange]);

  return (
    <Button type='link'
            onClick={handleClick}
            className='jmix-composition-field-upsert-btn'
    >
      <BtnTitle value={value} />
    </Button>
  );
});

interface BtnTitleProps {
  value?: MayHaveId[];
}

const BtnTitle = ({value}: BtnTitleProps) => {
  const intl = useIntl();

  if (value == null || value.length === 0) {
    return (
      <span>
        <PlusOutlined />
        <FormattedMessage id='cubaReact.nestedEntityField.addEntities' />
      </span>
    );
  }

  return (
    <>
      {constructTitle(value, intl)}
    </>
  );
};

function constructTitle(entityList: MayHaveId[], intl: IntlShape): string {
  return entityList.reduce((title: string, entity: MayHaveId, index: number, array: MayHaveId[]) => {
    if (index === 0) {
      return getDisplayedName(entity, intl);
    }
    if (index === 1) {
      return title + ', ' + getDisplayedName(entity, intl);
    }
    return title + ' ' + intl.formatMessage(
      {id: 'cubaReact.nestedEntityField.andXMore'},
      {quantity: array.length}
    );
  }, '') as string;
}

// TODO put (unsaved entity) to _instanceName when entity is edited client-side, otherwise it might be outdated
function getDisplayedName(entity: MayHaveId & MayHaveInstanceName, intl: IntlShape): string {
  if (entity._instanceName != null) {
    return entity._instanceName;
  }

  if (entity.id != null) {
    return toIdString(entity.id);
  }

  return intl.formatMessage({id: 'common.unsavedEntity'});
}
