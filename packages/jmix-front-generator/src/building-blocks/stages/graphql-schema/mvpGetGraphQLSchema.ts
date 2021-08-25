import {MvpCommonOptions} from "../options/pieces/mvp";
import {YeomanGenerator} from "../../YeomanGenerator";
import {buildClientSchema, GraphQLSchema} from "graphql";
import * as path from "path";
import * as fs from "fs";
import {loadSchema} from "@graphql-tools/load";

/**
 * This is the path:
 *
 * project-folder
 * ├── generation
 * │   └── node_modules
 * │       └── @haulmont
 * │           └── jmix-front-generator
 * │               └── bin <-------------- FROM HERE
 * └── schema.graphql <------------------- TO HERE
 *
 */
const DEFAULT_SCHEMA_PATH = '../../../../../schema.graphql';

export const mvpGetGraphQLSchema = async <O extends MvpCommonOptions>(
  options: O, invocationDir: string
): Promise<GraphQLSchema | undefined> => {
  if (options.schema == null) {
    return;
  }

  const schemaPath = getSchemaPath(invocationDir, options.schema);

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`GraphQL schema not found at "${schemaPath}"`);
  }

  const schemaString: string = fs.readFileSync(schemaPath, 'utf-8');

  let isSdlFormat = false;
  let introspection;
  try {
    introspection = JSON.parse(schemaString);
  } catch (e) {
    isSdlFormat = true;
  }

  if (isSdlFormat) {
    return await loadSchema(schemaString, {loaders: []});
  }

  return buildClientSchema(introspection.data);
}

function getSchemaPath(invocationDir: string, schemaArg?: string): string {
  if (schemaArg == null) {
    return DEFAULT_SCHEMA_PATH;
  }

  if (path.isAbsolute(schemaArg)) {
    return schemaArg;
  }

  return path.join(invocationDir, schemaArg);
}