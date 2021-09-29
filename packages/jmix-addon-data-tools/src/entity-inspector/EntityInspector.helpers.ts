import {
  findEntityMetadata, 
  MetaClassInfo, 
  Metadata
} from "@haulmont/jmix-react-core";
import {EntityNamesInfo} from "./EntityInspector.types";

export function getEntityNamesInfo(allEnttityNames: EntityNamesInfo[], entityName: string) : EntityNamesInfo {
  return allEnttityNames.find(entityNamesItem => entityNamesItem.entityName === entityName)!;
}

export function getAllPersistentEntityNames(metadata: Metadata): EntityNamesInfo[] {
  return metadata.entities
  .filter(({persistentEntity}) => persistentEntity)
  .map(({entityName, className}: MetaClassInfo) => {
      return {entityName, className};
  })
}

export function getAllEntityPropertyNames(entityName: string, metadata: Metadata): string[] | undefined {
  return findEntityMetadata(entityName, metadata)?.properties.map(({name}) => name);
} 