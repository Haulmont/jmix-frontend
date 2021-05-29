import express from "express";
import {ApolloServer} from "apollo-server-express";
import {readFileSync} from "fs";
import {mocks} from "./mocks";
import {restRouter} from "./rest";
import {oauthRouter} from "./oauth";


export async function createServer(schemaPath, mockRest = true) {
  let typeDefs
  try {
    typeDefs = await readFileSync(schemaPath).toString('utf-8');
  } catch (ex) {
    throw new Error(`Unable to read ${schemaPath}, please specify correct path to grapqhl schema file using --schema option`)
  }

  const expressApp = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    mocks
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({app: expressApp});
  expressApp.use(oauthRouter)
  if (mockRest) {
    expressApp.use(restRouter)
  }

  return {expressApp, apolloServer};
}