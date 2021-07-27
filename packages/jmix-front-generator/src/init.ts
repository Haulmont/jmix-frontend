import {existsSync, readdirSync, statSync} from 'fs';
import YeomanEnvironment from "yeoman-environment";
import path from "path";
import {OptionsConfig} from "./common/cli-options";
import {StudioTemplateProperty} from "./common/studio/studio-model";
import {GeneratorExports} from "./common/base-generator";

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
}

export interface GeneratorDiscoveryOptions {
  customizeClient?: string;
  customGeneratorPaths?: string[];
  customTemplatePaths?: string[];
  noStockGenerators?: boolean;
}

export function collectClients(generatorFileName?: string, opts?: GeneratorDiscoveryOptions): GeneratedClientInfo[] {
  const {
    customizeClient,
    customGeneratorPaths,
    customTemplatePaths,
    noStockGenerators
  } = opts ?? {};

  const clientsDirPath = path.join(__dirname, GENERATORS_DIR_NAME);
  const clients: GeneratedClientInfo[] = readClientDir(clientsDirPath, generatorFileName, customizeClient, noStockGenerators);

  includeCustomTemplates(clients, customizeClient, customTemplatePaths);
  includeCustomGenerators(clients, customizeClient, customGeneratorPaths);

  return clients;
}

function includeCustomTemplates(
  clients: GeneratedClientInfo[],
  customizeClient?: string,
  customTemplatePaths?: string[],
) {
  if (customTemplatePaths == null || customizeClient == null) {
    // No custom generators to be added
    return;
  }

  for (const templatePath of customTemplatePaths) {
    const dirs = readdirSync(templatePath);

    for (const dir of dirs) {
      const templateLocation = path.resolve(templatePath, dir);
      const generatorName = path.basename(dir);

      const clientIndex = clients.findIndex(c => c.name === customizeClient);
      if (clientIndex === -1) {
        throw new Error(`Tried to customize client "${customizeClient}", but there is no such client.`);
      }
      const generatorIndex = clients[clientIndex]
        ?.generators
        ?.findIndex(g => g.name === generatorName);
      if (generatorIndex === -1) {
        throw new Error(`Tried to use a custom template for generator "${generatorName}" in client "${customizeClient}", but there is no such generator. Did you mean to create a custom generator instead? Failed on custom template path "${templateLocation}".`);
      }
      clients[clientIndex].generators[generatorIndex].templateOverride = templateLocation;
    }

  }
}

function includeCustomGenerators(
  clients: GeneratedClientInfo[],
  customizeClient?: string,
  customGeneratorPaths?: string[],
) {
  if (customGeneratorPaths == null || customizeClient == null) {
    // No custom generators to be added
    return;
  }

  const customGenerators = customGeneratorPaths.reduce((generators: GeneratorInfo[], generatorPath: string) => {
    return generators.concat(collectGenerators(generatorPath));
  }, []);

  const clientToCustomize = clients.find(client => client.name === customizeClient);
  if (clientToCustomize == null) {
    throw new Error(`Attempted to customize client ${customizeClient} but was not able to find it`);
  }
  clientToCustomize.generators = clientToCustomize.generators.concat(customGenerators);
}

function readClientDir(clientsDirPath: string, generatorFileName?: string, customizeClient?: string, noStockGenerators?: boolean): GeneratedClientInfo[] {
  return readdirSync(clientsDirPath).map((clientDirName): GeneratedClientInfo => {
    return readClient(clientsDirPath, clientDirName, generatorFileName,  (clientDirName !== customizeClient) && noStockGenerators);
  });
}

/**
 * @alpha
 */
export function readClient(clientsDirPath: string, clientDirName: string, generatorFileName?: string, noStockGenerators?: boolean): GeneratedClientInfo {
  const info:ProvidedClientInfo = require(path.join(clientsDirPath, clientDirName, INFO_FILE_NAME));
  return {
    bundled: true,
    name: clientDirName,
    bower: info.bower,
    clientBaseTech: info.clientBaseTech,
    generators: noStockGenerators ? [] : collectGenerators(path.join(clientsDirPath, clientDirName), generatorFileName),
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