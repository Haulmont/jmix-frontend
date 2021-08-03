import {existsSync, readdirSync, statSync} from 'fs';
import YeomanEnvironment from "yeoman-environment";
import path from "path";
import {OptionsConfig} from "./common/cli-options";
import {StudioTemplateProperty} from "./common/studio/studio-model";
import { GeneratorExports } from './common/cli/cli';
import * as fs from "fs";

const GENERATORS_DIR_NAME = 'generators';
const GENERATOR_FILE_NAME = 'index.js';
const INFO_FILE_NAME = 'info.json';

/**
 * @alpha
 */
export interface GeneratedClientInfo {
  bundled: boolean;
  name: string;
  generators: GeneratorInfo[];
  bower?: boolean;
  clientBaseTech?: string;
}

export interface ProvidedClientInfo {
  bower: boolean
  clientBaseTech: string
}

export interface GeneratorInfo {
  index: number;
  name: string;
  description?: string;
  options?: OptionsConfig;
  params?: StudioTemplateProperty[];
  iconPath?: string;
  path: string;
  templateOverride?: string;
  group?: string;
}

export interface GeneratorDiscoveryOptions {
  clientToCustomize?: string;
  customGeneratorPaths?: string[];
  customTemplatePaths?: string[];
  allowGroups?: string[];
}

export function collectClients(generatorFileName?: string, opts?: GeneratorDiscoveryOptions): GeneratedClientInfo[] {
  const {
    clientToCustomize,
    customGeneratorPaths,
    customTemplatePaths,
    allowGroups
  } = opts ?? {};

  const clients: GeneratedClientInfo[] = collectBundledGenerators(generatorFileName, allowGroups);
  collectGeneratorsFromProject(clients);
  collectGeneratorsFromCustomPaths(clients, clientToCustomize, customGeneratorPaths, allowGroups);
  collectTemplatesFromCustomPaths(clients, clientToCustomize, customTemplatePaths);

  return clients;
}

function collectBundledGenerators(
  generatorFileName?: string,
  allowGroups?: string[],
) {
  const clientsDirPath = path.join(__dirname, GENERATORS_DIR_NAME);
  return readClientDir(clientsDirPath, generatorFileName, allowGroups);
}

function collectGeneratorsFromProject(
  clients: GeneratedClientInfo[]
) {
  const PROJECT_CLIENTS_RELATIVE_PATH = '../../../../generators';
  const projectClientsPath = path.join(__dirname, PROJECT_CLIENTS_RELATIVE_PATH);

  if (!fs.existsSync(projectClientsPath)) {
    return;
  }

  const projectClientArray = readClientDir(projectClientsPath);

  for (const projectClient of projectClientArray) {
    const clientIndex = clients.findIndex(c => c.name === projectClient.name);
    if (clientIndex > -1) {
      // We already have such client, so we merge generators
      clients[clientIndex].generators.push(...projectClient.generators);
      continue;
    }
    // We don't already have such client, so we push it
    clients.push(projectClient);
  }
}

function collectTemplatesFromCustomPaths(
  clients: GeneratedClientInfo[],
  clientToCustomize?: string,
  customTemplatePaths?: string[],
): string[] {
  if (customTemplatePaths == null || clientToCustomize == null) {
    // No custom templates to be added
    return [];
  }

  const customizedGenerators: string[] = [];

  for (const templatePath of customTemplatePaths) {
    const dirs = readdirSync(templatePath);
    customizedGenerators.push(...dirs);

    for (const dir of dirs) {
      if (fs.statSync(path.join(templatePath, dir)).isFile()) {
        continue;
      }

      const templateLocation = path.resolve(templatePath, dir);
      const generatorName = path.basename(dir);

      const clientIndex = clients.findIndex(c => c.name === clientToCustomize);
      if (clientIndex === -1) {
        throw new Error(`Tried to customize client "${clientToCustomize}", but there is no such client.`);
      }
      const generatorIndex = clients[clientIndex]
        ?.generators
        ?.findIndex(g => g.name === generatorName);
      if (generatorIndex === -1) {
        throw new Error(`Tried to use a custom template for generator "${generatorName}" in client "${clientToCustomize}", but there is no such generator. Did you mean to create a custom generator instead? Failed on custom template path "${templateLocation}".`);
      }
      clients[clientIndex].generators[generatorIndex].templateOverride = templateLocation;
    }

  }

  return customizedGenerators;
}

function collectGeneratorsFromCustomPaths(
  clients: GeneratedClientInfo[],
  clientToCustomize?: string,
  customGeneratorPaths?: string[],
  allowGroups?: string[]
) {
  if (customGeneratorPaths == null || clientToCustomize == null) {
    // No custom generators to be added
    return;
  }

  const customGenerators = customGeneratorPaths.reduce((generators: GeneratorInfo[], generatorPath: string) => {
    return generators.concat(collectGenerators(generatorPath, undefined, allowGroups));
  }, []);

  const clientObject = clients.find(client => client.name === clientToCustomize);
  if (clientObject == null) {
    throw new Error(`Attempted to customize client ${clientToCustomize} but was not able to find it`);
  }
  clientObject.generators = clientObject.generators.concat(customGenerators);
}

function readClientDir(clientsDirPath: string, generatorFileName?: string, allowGroups?: string[]): GeneratedClientInfo[] {
  return readdirSync(clientsDirPath).map((clientDirName): GeneratedClientInfo => {
    return readClient(clientsDirPath, clientDirName, generatorFileName, allowGroups);
  });
}

/**
 * @alpha
 */
export function readClient(clientsDirPath: string, clientDirName: string, generatorFileName?: string, allowGroups?: string[]): GeneratedClientInfo {
  const info:ProvidedClientInfo = require(path.join(clientsDirPath, clientDirName, INFO_FILE_NAME));
  return {
    bundled: true,
    name: clientDirName,
    bower: info.bower,
    clientBaseTech: info.clientBaseTech,
    generators: collectGenerators(path.join(clientsDirPath, clientDirName), generatorFileName, allowGroups),
  }
}

export async function generate(
  generatorPath: string,
  options?: {},
  templateOverride?: string,
): Promise<void> {
  const env = new YeomanEnvironment();

  const {generator} = await import(generatorPath);
  env.registerStub(generator, generator.name);
  return env.run(generator.name, {
    templateOverride,
    ...options
  });
}

function collectGenerators(generatorsDir: string, genFileName: string = GENERATOR_FILE_NAME, allowGroups?: string[]): GeneratorInfo[] {
  const dirs = readdirSync(generatorsDir);
  return sortGenerators(dirs.reduce((generators: GeneratorInfo[], name: string) => {
    const generatorPath = path.join(generatorsDir, name);
    if (existsSync(path.join(generatorPath, genFileName)) && statSync(generatorPath).isDirectory()) {
      const generatorExports: GeneratorExports = require(generatorPath);
      if (generatorExports.generator == null) {
        return generators;
      }
      const skipGenerator = allowGroups != null
        && (generatorExports.group == null || !allowGroups.includes(generatorExports.group));
      if (skipGenerator) {
        return generators;
      }
      const options = generatorExports.options;
      const params = generatorExports.params;
      const description = generatorExports.description;
      const index = generatorExports.index ?? dirs.length; // will be pushed to a tail if no index
      const group = generatorExports.group;

      const iconPath = generatorExports.icon
        ? path.relative(process.cwd(), path.join(generatorPath, generatorExports.icon))
        : undefined;

      generators.push({name, options, params, description, iconPath, index, path: generatorPath, group});
      return generators;
    } else {
      return generators;
    }
  }, []));
}

function sortGenerators(generators: GeneratorInfo[]) {
  return generators.slice().sort((a, b) => a.index - b.index);
}