import path from "path";
import {generateEntities} from "./model/entities-generation";
import {YeomanGenerator} from "../../../../YeomanGenerator";
import {ProjectModel} from "../../../../../common/model/cuba-model";
import {getAllEntities} from "../../../../../common/model/cuba-model-utils";

const pickMetadataFromProjectModel = (projectModel: ProjectModel) => ({
  entities: getAllEntities(projectModel).map(entity => ({
    name: entity.name,
    className: entity.className,
    persistentEntity: entity.persistentEntity,
    idAttributeName: entity.idAttributeName,
    attributes: entity.attributes.map(attr => ({
      name: attr.name,
      type: attr.type,
      mappingType: attr.mappingType,
      cardinality: attr.cardinality,
      readOnly: attr.readOnly,
      mandatory: attr.mandatory,
      transient: attr.transient,
    })),
  })),
  enums: projectModel.enums.map(enumElem => ({
    className: enumElem.className,
    fqn: enumElem.fqn,
    values: enumElem.values,
  })),
})

export function writeSdkModel(
    gen: YeomanGenerator,
    model: ProjectModel,
    destination?: string
  ) {
    return generateEntities(model, path.join(gen.destinationPath(), destination || ''), gen.fs);
}

export function writeSdkAll(
    gen: YeomanGenerator,
    model: ProjectModel,
    destination?: string
  ) {
    const {restQueries, restServices} = model;
    const ctx = writeSdkModel(gen, model, destination);

    const metadata = pickMetadataFromProjectModel(model);
    const pathToWriteMetadata = path.join(gen.destinationPath(), destination || '', 'metadata.json');
    gen.fs.writeJSON(pathToWriteMetadata, metadata);
}
