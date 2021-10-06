const { runCmdSync, btoa, amplicodegen } = require("./common");
const fs = require('fs');

const appAnswers = btoa(JSON.stringify({
  appTitle: "Jmix2 Petclinic",
  appShortName: "jmix2-petclinic",
  graphqlUri: "/graphql"
}));

const appCommand = `node ${amplicodegen} react-typescript:app`
+ ` --answers ${appAnswers}`
+ ` --dest C:/Users/palkinli/Projects/amplicode-frontend-1/example-app`;

if (!fs.existsSync('../example-app')) {
  runCmdSync('mkdirp ../example-app');
}
runCmdSync(appCommand);
