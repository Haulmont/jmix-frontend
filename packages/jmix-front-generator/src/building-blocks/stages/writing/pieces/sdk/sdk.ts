import * as path from "path";
import {generateEntities} from "./model/entities-generation";
import {generateServices} from "./services/services-generation";
import {generateQueries} from "./services/queries-generation";
import {YeomanGenerator} from "../../../../YeomanGenerator";
import {ProjectModel} from "../../../../../common/model/cuba-model";

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
}
