import React, {useState, useMemo, useCallback} from 'react';
import {
  useMetadata, 
  getAllPersistentEntitiesNames, 
  getAllEntityPropertiesNames, 
  Metadata,
  EntityNamesInfo
} from "@haulmont/jmix-react-core";
import { saveHistory } from '@haulmont/jmix-react-ui';
import {EntitySelect} from "../entity-select";
import {EntityDataViewer} from "../entity-data-viewer"
import { observer } from 'mobx-react';
import { ScreenItem, ViewerModes } from '../EntityInspector';
interface Props {
  setScreens: React.Dispatch<React.SetStateAction<ScreenItem[]>>,
  routingPath: string
}

export const EntityInspectorMain = observer(({setScreens, routingPath}: Props) => {
  const [entityName, setEntityName] = useState<string>();

  const metadata: Metadata = useMetadata();

  const onSelectChange = useCallback((value: string) => {
    saveHistory(routingPath);
    setEntityName(value);
  }, []);

  const allEntitiesNames = useMemo(() => {
    return  getAllPersistentEntitiesNames(metadata)
  }, [metadata]);

  const entityAttrs: string[] = useMemo(() => {
    return entityName 
      ? getAllEntityPropertiesNames(entityName, metadata) ?? []
      : []
  }, [entityName]);


  return (
    <>
      <EntitySelect
        entities={allEntitiesNames}
        onSelectChange={onSelectChange}
      />
      {renderEntityDataViewer(entityName, entityAttrs,allEntitiesNames,routingPath, setScreens)}
    </>
  )
})

function renderEntityDataViewer(
  entityName: string | undefined, 
  entityAttrs: string[], 
  allEntitiesNames: EntityNamesInfo[], 
  routingPath: string,
  setScreens: React.Dispatch<React.SetStateAction<ScreenItem[]>>
) {
  if (!entityName) {
    return (
      <div>
        No selected entity
      </div>
    )
  }

  if(entityAttrs.length === 0) {
    return (
      <div>
        No data to inspect
      </div>
    )
  }

  return (
    <EntityDataViewer
      mode={ViewerModes.Inspection}
      entityNamesInfo={getEntityNamesInfo(allEntitiesNames, entityName)}
      entityAttrs={entityAttrs}
      routingPath={routingPath}
      setScreens={setScreens}
    />
  )
}

export function getEntityNamesInfo(allEnttityNames: EntityNamesInfo[], entityName: string) : EntityNamesInfo {
  return allEnttityNames.find((entityNamesItem) => {
    return entityNamesItem.entityName === entityName
  })!;
}
