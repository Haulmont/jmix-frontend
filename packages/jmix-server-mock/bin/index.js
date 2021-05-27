#!/usr/bin/env node
'use strict';
process.title = 'jmix-server-mock';

const args = process.argv.slice(2);

if (args[0] == null) {
    throw new Error("First argument should be path to graphql.schema file")
}

require('../dist').startMockJmixServer(args[0])
    .then(_ => console.log("Server started"))
    .catch(ex => {
        console.log(`Unable to start server`, ex);
        process.exit(1);
    })