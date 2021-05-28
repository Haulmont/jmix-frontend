import express from "express";
import {ApolloServer} from "apollo-server-express";
import {readFileSync} from "fs";
import {mocks} from "./mocks";
import {restRouter} from "./rest";
import {oauthRouter} from "./oauth";


export async function createServer(schemaPath, mockRest = true) {
  const typeDefs = await readFileSync(schemaPath).toString('utf-8');

  const expressApp = express();

  const server = new ApolloServer({
    typeDefs,
    mocks
  });
  await server.start();

  server.applyMiddleware({app: expressApp});
  expressApp.use(oauthRouter)
  if (mockRest) {
    expressApp.use(restRouter)
  }

  return {server, app: expressApp};
}

export async function startMockJmixServer(schemaPath, port = 8080) {

  const {server, app} = await createServer(schemaPath);

  app.listen({port});
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  return {server, app};

}