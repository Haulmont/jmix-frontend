import React, {useState, useMemo, useCallback} from 'react';
import {
  useMetadata, 
  Metadata
} from "@haulmont/jmix-react-core";
import { saveHistory } from '@haulmont/jmix-react-antd';
import {EntitySelect} from "../entity-select";
import {EntityDataViewer} from "../entity-data-viewer"
import { observer } from 'mobx-react';
import { ViewerModes, EntityNamesInfo, ScreensControl } from '../EntityInspector.types';
import {getEntityNamesInfo, getAllEntityPropertyNames, getAllPersistentEntityNames} from "../EntityInspector.helpers";
import { FormattedMessage } from 'react-intl';
interface Props {
  screensControl: ScreensControl,
  routingPath: string
}

export const EntityInspectorMain = observer(({screensControl, routingPath}: Props) => {
  const [entityName, setEntityName] = useState<string>();

  const metadata: Metadata = useMetadata();

  const onSelectChange = useCallback((value: string) => {
    saveHistory(routingPath);
    setEntityName(value);
  }, []);

  const allEntitiesNames = useMemo(() => {
    return  getAllPersistentEntityNames(metadata)
  }, [metadata]);

  const entityAttrs: string[] = useMemo(() => {
    return entityName 
      ? getAllEntityPropertyNames(entityName, metadata) ?? []
      : []
  }, [entityName]);


  return (
    <>
      <EntitySelect
        entities={allEntitiesNames}
        onSelectChange={onSelectChange}
      />
      {renderEntityDataViewer(entityName, entityAttrs,allEntitiesNames,routingPath, screensControl)}
    </>
  )
})

function renderEntityDataViewer(
  entityName: string | undefined, 
  entityAttrs: string[], 
  allEntitiesNames: EntityNamesInfo[], 
  routingPath: string,
  screensControl: ScreensControl
) {
  if (!entityName) {
    return (
      <div>
        <FormattedMessage id={"addons.DataTools.noSelected"}/>
      </div>
    )
  }

  if(entityAttrs.length === 0) {
    return (
      <div>
        <FormattedMessage id={"addons.DataTools.noData"}/>
      </div>
    )
  }

  return (
    <EntityDataViewer
      mode={ViewerModes.Inspection}
      entityNamesInfo={getEntityNamesInfo(allEntitiesNames, entityName)}
      entityAttrs={entityAttrs}
      routingPath={routingPath}
      screensControl={screensControl}
    />
  )
}
