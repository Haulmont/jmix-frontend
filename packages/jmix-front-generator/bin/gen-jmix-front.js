#!/usr/bin/env node

'use strict';

process.title = 'gen-jmix-front';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection ', p, ' reason: ', reason);
  process.exit(1);
});

/*
 * Arguments that are meant to be used by CLI creation process rather than by CLI itself
 * should be passed last and separated by the rest of the arguments by "--".
 *
 * For example:
 *
 * gen-jmix-front react-typescript:app --model=model.js -- --cliCreationOption
 *
 */
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const customGeneratorPaths = argv.customGeneratorPaths != null
  ? JSON.parse(argv.customGeneratorPaths)
  : undefined;

if (!Array.isArray(customGeneratorPaths)) {
  throw new Error(`Unexpected --customGeneratorPaths option, expected a string parseable to an array, got ${argv.customGeneratorPaths}`);
}

const includeStockGenerators = argv.includeStockGenerators != null
  ? JSON.parse(argv.includeStockGenerators)
  : undefined;

if (typeof includeStockGenerators !== 'boolean') {
  throw new Error(`Unexpected --includeStockGenerators option, expected a string parseable to a boolean, got ${argv.includeStockGenerators}`);
}

require('../lib/cli').createAndLaunchCli({
  customGeneratorPaths,
  includeStockGenerators,
});