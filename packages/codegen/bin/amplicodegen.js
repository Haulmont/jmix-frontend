#!/usr/bin/env node

'use strict';

process.title = 'amplicodegen';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection ', p, ' reason: ', reason);
  process.exit(1);
});

require('../lib/cli').createAndLaunchCli();