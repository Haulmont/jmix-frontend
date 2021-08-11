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
import styles from './CompositionFields.module.less';
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {PlusOutlined} from "@ant-design/icons";
import {openEntityListScreen} from "../../util/screen";
import {ant_to_jmixFront} from "../../formatters/ant_to_jmixFront";
import classNames from "classnames";

export interface CompositionO2MFieldProps {
  value?: EntityInstance[];
  onChange?: (value?: this['value']) => void;
  entityName: string;
}

export const CompositionO2MField = observer((props: CompositionO2MFieldProps) => {
  const {value, entityName, onChange} = props;

  const metadata = useMetadata();
  const screens = useContext(ScreensContext);
  const intl = useIntl();

  const entityList = value?.map(item => ant_to_jmixFront(item, entityName, metadata)) ?? [];

  const handleClick = useCallback(() => {
    openEntityListScreen({
      entityName,
      entityList,
      screens,
      onEntityListChange: onChange,
      intl
    });
  }, [entityName, entityList, screens, onChange]);

  return (
    <Button type='link'
            onClick={handleClick}
            className={classNames(
              styles.compositionField,
              styles.upsertBtn
            )}
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
