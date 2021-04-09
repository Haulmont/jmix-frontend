import * as path from "path";
import {generateEntities} from "./model/entities-generation";
import {generateServices} from "./services/services-generation";
import {generateQueries} from "./services/queries-generation";
import {YeomanGenerator} from "../../../../YeomanGenerator";
import {ProjectModel} from "../../../../../common/model/cuba-model";
import {getAllEntities} from "../../../../../common/model/cuba-model-utils";

const pickMetadataFromProjectModel = (projectModel: ProjectModel) => ({
  entities: getAllEntities(projectModel).map(entity => ({
    name: entity.name,
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
    return generateEntities(model, path.join(gen.destinationRoot(destination)), gen.fs);
}

export function writeSdkAll(
    gen: YeomanGenerator,
    model: ProjectModel,
    destination?: string
  ) {
    const {restQueries, restServices} = model;
    const ctx = writeSdkModel(gen, model, destination);

    const services = generateServices(restServices, ctx);
    const pathToWriteServices = gen.destinationPath('services.ts');
    gen.fs.write(pathToWriteServices, services);

    const queries = generateQueries(restQueries, ctx);
    const pathToWriteQueriess = gen.destinationPath('queries.ts');
    gen.fs.write(pathToWriteQueriess, queries);

    const metadata = pickMetadataFromProjectModel(model);
    const pathToWriteMetadata = gen.destinationPath('metadata.json');
    gen.fs.writeJSON(pathToWriteMetadata, metadata);
}
