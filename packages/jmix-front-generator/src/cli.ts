/* istanbul ignore file */ //todo not sure how to test and cover this
import {generate, collectClients, GeneratedClientInfo} from "./init";
import {Command, Option} from 'commander';
import {exportList} from "./list";
import {extractAvailableOptions, pickOptions} from "./common/cli-options";
import * as path from "path";

export const ownVersion = require('../package').version;

interface CustomGeneratorConfig {
  customGeneratorPaths?: string[];
}

export function createAndLaunchCli() {
  const {program}: {program: Command} = require('commander');

  // Add options that configure which generators to use
  program
    .addOption(new Option(
      '--custom-generator-paths <paths...>',
      'Use custom generators from the filesystem.'
    ))
    .allowUnknownOption(true); // Otherwise program.parse below will fail when any other (command-specific) options are provided. We set allowUnknownOption back to false once we know the full list of options.

  const {customGeneratorPaths} = program.parse().opts<CustomGeneratorConfig>();

  const expandRelativePath = (p: string) => path.resolve(p);

  const clients: GeneratedClientInfo[] = collectClients(undefined, {
    customGeneratorPaths: customGeneratorPaths?.map(expandRelativePath),
  });

  const cli: Command = createCli(ownVersion, clients, undefined, undefined, program);
  launchCli(cli);
}

export function createCli(
  version: string,
  clients: GeneratedClientInfo[],
  customClientNames?: string[],
  customClientsBaseDir?: string,
  program: Command = require('commander'),
): Command {
  program.version(version, '-v, --version')
    .usage('[command] [options]');

  program
    .command('list')
    .description('List all available clients and their clients')
    .option('-s, --save [saveTo]', 'Save information about clients ')
    .action((cmd) => exportList(clients, cmd));

  clients.forEach(client => {
    client.generators.forEach(function (generator) {

      const generationCommand = program
        .command(`${client.name}:${generator.name}`)
        .description(`Generates ${client.name} ${generator.name}`);

      extractAvailableOptions(generator.options).forEach(({pattern, description}) => {
        generationCommand.option(pattern, description);
      });

      program.allowUnknownOption(false);

      generationCommand.action(function (cmd) {
        return generate(generator.path, pickOptions(cmd, generator.options), generator.templateOverride);
      })

    })
  });

  return program;
}

export function launchCli(program: Command) {
  program.parse(process.argv); // invokes provided command

  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }
}
