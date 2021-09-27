const {runCmdSync} = require("./common");

runCmdSync('node generate-app.js', './scripts');
runCmdSync('node generate-owner-crud.js', './scripts');
runCmdSync('node generate-pet-crud.js', './scripts');
runCmdSync('node generate-read-only.js', './scripts');

runCmdSync('npm i --prefix example-app');