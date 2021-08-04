import express from "express";
import {ApolloServer, gql} from "apollo-server-express";
import {readFileSync} from "fs";
import {mocks, mockedResolvers} from "./mocks";
import {restRouter} from "./rest";
import {createOauthRouter} from "./oauth";


export async function createServer(schemaPath, mockRest = true, allowInvalidCreds = true) {
  let typeDefs
  try {
    typeDefs = await readFileSync(schemaPath).toString('utf-8');
  } catch (ex) {
    throw new Error(`Unable to read ${schemaPath}, please specify correct path to grapqhl schema file using --schema option`)
  }

  const expressApp = express();
  
  const apolloServer = new ApolloServer({
    typeDefs,
    mocks,
    resolvers: mockedResolvers(gql`${typeDefs}`),
    mockEntireSchema: false
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({app: expressApp});
  expressApp.use(express.urlencoded({extended: false}), express.json())
  expressApp.use(createOauthRouter(allowInvalidCreds))
  if (mockRest) {
    expressApp.use(restRouter)
  }

  return {expressApp, apolloServer};
}
