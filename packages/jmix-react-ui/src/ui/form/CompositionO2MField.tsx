import React, { useCallback, useContext } from "react";
import { observer } from "mobx-react";
import {
  EntityInstance,
  ScreensContext,
  toIdString,
  useMetadata,
  isTempId
} from "@haulmont/jmix-react-core";
import {Button} from "antd";
import './CompositionFields.less';
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {PlusOutlined} from "@ant-design/icons";
import {openEntityListScreen} from "../../util/screen";
import {ant_to_jmixFront} from "../../formatters/ant_to_jmixFront";

export interface CompositionO2MFieldProps {
  value?: EntityInstance[];
  onChange?: (value?: this['value']) => void;
  entityName: string;
  reverseAttrName: string;
}

export const CompositionO2MField = observer((props: CompositionO2MFieldProps) => {
  const {value, entityName, onChange, reverseAttrName} = props;

  const metadata = useMetadata();
  const screens = useContext(ScreensContext);

  const entityList = value?.map(item => ant_to_jmixFront(item, entityName, metadata)) ?? [];

  const handleClick = useCallback(() => {
    openEntityListScreen({
      entityName,
      entityList,
      screens,
      onEntityListChange: onChange, // TODO decouple from ant
      reverseAttrName,
    });
  }, [entityName, entityList, screens, onChange, reverseAttrName]);

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
  value?: EntityInstance[];
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

export function constructTitle(entityList: EntityInstance[], intl: IntlShape): string {
  let title = '';

  if (entityList.length > 0) {
    title += getDisplayedName(entityList[0], intl);
  }
  if (entityList.length > 1) {
    title += ', ';
    title += getDisplayedName(entityList[1], intl);
  }
  if (entityList.length > 2) {
    title += intl.formatMessage(
      {id: 'cubaReact.nestedEntityField.andXMore'},
      {quantity: entityList.length - 2}
    );
  }

  return title;
}

function getDisplayedName(entity: EntityInstance, intl: IntlShape): string {
  if (entity._instanceName != null) {
    return entity._instanceName;
  }

  if (entity.id != null && !isTempId(toIdString(entity.id))) {
    return toIdString(entity.id);
  }

  return intl.formatMessage({id: 'common.unsavedEntity'});
}
