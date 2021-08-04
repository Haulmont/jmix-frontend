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
  customGeneratorPaths?: string[];
}

export function collectClients(generatorFileName?: string, opts?: GeneratorDiscoveryOptions): GeneratedClientInfo[] {
  const {
    customGeneratorPaths,
  } = opts ?? {};

  const clients: GeneratedClientInfo[] = collectBundledGenerators(generatorFileName);
  collectGeneratorsFromProject(clients);
  collectGeneratorsFromCustomPaths(clients, customGeneratorPaths);

  return clients;
}

function collectBundledGenerators(
  generatorFileName?: string,
) {
  const clientsDirPath = path.join(__dirname, GENERATORS_DIR_NAME);
  return readClientDir(clientsDirPath, generatorFileName);
}

function collectGeneratorsFromProject(
  clients: GeneratedClientInfo[]
) {
  const PROJECT_CLIENTS_RELATIVE_PATH = '../../../../generators';
  const projectClientsPath = path.join(__dirname, PROJECT_CLIENTS_RELATIVE_PATH);

  if (!fs.existsSync(projectClientsPath)) {
    return;
  }

  collectFromPath(clients, projectClientsPath);
}

function collectFromPath(
  clients: GeneratedClientInfo[],
  customPath: string
) {
  const customClientArray = readClientDir(customPath);

  for (const customClient of customClientArray) {
    const clientIndex = clients.findIndex(c => c.name === customClient.name);
    if (clientIndex > -1) {
      // We already have such client, so we merge generators
      clients[clientIndex].generators.push(...customClient.generators);
      continue;
    }
    // We don't already have such client, so we push it
    clients.push(customClient);
  }
}

function collectGeneratorsFromCustomPaths(
  clients: GeneratedClientInfo[],
  customGeneratorPaths?: string[],
) {
  if (customGeneratorPaths == null) {
    // No custom generators to be added
    return;
  }

  for (const customPath of customGeneratorPaths) {
    collectFromPath(clients, customPath);
  }
}

function readClientDir(clientsDirPath: string, generatorFileName?: string): GeneratedClientInfo[] {
  return readdirSync(clientsDirPath).map((clientDirName): GeneratedClientInfo => {
    return readClient(clientsDirPath, clientDirName, generatorFileName);
  });
}

/**
 * @alpha
 */
export function readClient(clientsDirPath: string, clientDirName: string, generatorFileName?: string): GeneratedClientInfo {
  const info:ProvidedClientInfo = require(path.join(clientsDirPath, clientDirName, INFO_FILE_NAME));
  return {
    bundled: true,
    name: clientDirName,
    bower: info.bower,
    clientBaseTech: info.clientBaseTech,
    generators: collectGenerators(path.join(clientsDirPath, clientDirName), generatorFileName),
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

function collectGenerators(generatorsDir: string, genFileName: string = GENERATOR_FILE_NAME): GeneratorInfo[] {
  const dirs = readdirSync(generatorsDir);
  return sortGenerators(dirs.reduce((generators: GeneratorInfo[], name: string) => {
    const generatorPath = path.join(generatorsDir, name);
    if (existsSync(path.join(generatorPath, genFileName)) && statSync(generatorPath).isDirectory()) {
      const generatorExports: GeneratorExports = require(generatorPath);
      if (generatorExports.generator == null) {
        return generators;
      }
      const options = generatorExports.options;
      const params = generatorExports.params;
      const description = generatorExports.description;
      const index = generatorExports.index ?? dirs.length; // will be pushed to a tail if no index

      const iconPath = generatorExports.icon
        ? path.relative(process.cwd(), path.join(generatorPath, generatorExports.icon))
        : undefined;

      generators.push({name, options, params, description, iconPath, index, path: generatorPath});
      return generators;
    } else {
      return generators;
    }
  }, []));
}

function sortGenerators(generators: GeneratorInfo[]) {
  return generators.slice().sort((a, b) => a.index - b.index);
}