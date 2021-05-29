#!/usr/bin/env node
'use strict';
process.title = 'jmix-server-mock';

const argv = require('yargs/yargs')(process.argv.slice(2))
  .option('s', {
    alias: 'schema',
    default: 'schema.graphql',
    describe: 'path to graphql schema file'
  })
  .option('p', {
    alias: 'port',
    default: '4000'
  })
  .option('mockRest', {
    default: true,
    type:'boolean'
  })
  .help('h')
  .alias('h', 'help')
  .argv;

const {schema, port, mockRest} = argv;

require('../dist').createServer(schema, mockRest)
  .then(({expressApp, apolloServer}) => {
    expressApp.listen({port});
    console.log(`Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  })
  .catch(ex => {
    console.log(`Unable to start server`, ex);
    process.exit(1);
  })