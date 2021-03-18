const {runCmdSync, log} = require("../common");
const fs = require('fs');
const {isEmptyDir} = require("../common");

function updateJmixApp() {
  if (!fs.existsSync('scr-jmix') && isEmptyDir('scr-jmix')) {
    log.error('repo not found');
    return;
  }
  runCmdSync('git -C scr-jmix pull');
  log.success('repo has been updated');
}

updateJmixApp();