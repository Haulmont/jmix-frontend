const { runCmdSync, btoa, gjf } = require("./common");
const fs = require('fs');

const appAnswers = btoa(JSON.stringify({
  appTitle: "Jmix2 Petclinic",
  appShortName: "jmix2-petclinic",
  graphqlUri: "/graphql"
}));

const appCommand = `
${gjf} react-typescript:mvp-app \\
  --answers ${appAnswers} \\
  --dest ../example-app
`;

if (!fs.existsSync('../example-app')) {
  runCmdSync('mkdir ../example-app');
}
runCmdSync(appCommand);
