import React, { useCallback } from "react";
import {
  EntityInstance,
  toIdString,
  useMetadata,
  isTempId,
  MayHaveId
} from "@haulmont/jmix-react-core";
import {Button} from "antd";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {PlusOutlined} from "@ant-design/icons";
import { CompositionComponentProps } from "../CompositionField";
import { ViewerModes } from "../../../EntityInspector.types";
import { getAllEntityPropertyNames } from "../../../EntityInspector.helpers";
import { ant_to_jmixFront } from "@haulmont/jmix-react-antd";
import { observer } from "mobx-react";



export const CompositionO2M = observer((props: CompositionComponentProps) => {
  const {
    value, 
    parentEntityName, 
    onChange, 
    screensControl, 
    attrInfo, 
    entityNamesInfo, 
    routingPath
  } = props;

  const {openViewerScreen} = screensControl;

  const metadata = useMetadata();
  const entityList = (value as MayHaveId[])?.map(item => ant_to_jmixFront(item, parentEntityName, metadata)) ?? [];

  const handleClick = useCallback(() => {
    openViewerScreen({
      screensControl,
      mode: ViewerModes.Inspection,
      entityAttrs: getAllEntityPropertyNames(attrInfo.type, metadata),
      entityNamesInfo,
      routingPath,
      entityList,
      onEntityListChange: onChange
    }, `${attrInfo.name} view`);
  }, [attrInfo, entityNamesInfo, entityList, onChange, routingPath, screensControl]);

  return (
    <Button type='link'
            onClick={handleClick}
            className='jmix-composition-field jmix-composition-field-upsert-btn'
    >
      <BtnTitle value={value as MayHaveId[]} />
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
        <FormattedMessage id='jmix.nestedEntityField.addEntities' />
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
      {id: 'jmix.nestedEntityField.andXMore'},
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
