import express from "express";
import {ApolloServer} from "apollo-server-express";
import {readFileSync} from "fs";
import {mocks, oauthTokenInfo} from "./mocks";


export async function createServer(schemaPath) {
    const typeDefs = await readFileSync(schemaPath).toString('utf-8');

    const expressApp = express();

    const server = new ApolloServer({
        typeDefs,
        mocks
    });
    await server.start();

    server.applyMiddleware({ app: expressApp });

    expressApp.post("/oauth/token",(req, res) => {
        res.send(oauthTokenInfo)
    });

    return { server, app: expressApp };
}

export async function startMockJmixServer(schemaPath, port = 8080) {

    const {server, app} = await createServer(schemaPath);

    app.listen({ port });
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    return { server, app };

}