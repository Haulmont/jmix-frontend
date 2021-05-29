## Usage

### Command Line
```shell
npx @haulmont/jmix-server-mock
```
By default, it will use `schema.graphql` and start server at port 4000  http://localhost:4000/graphql

Customize schema path and port using corresponding options

```shell
npx @haulmont/jmix-server-mock --schema path/to/schema.graphql --port 8081
```

### From Code

```javascript
require('@haulmont/jmix-server-mock').createServer(schemaPath)
    .then(({expressApp, apolloServer}) => {
      expressApp.listen({port});
      console.log(`Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    })
```

### Usage in Jmix Frontend

Make sure `@haulmont/react-scripts` is used

```json
  "devDependencies": {
    ...
    "@haulmont/react-scripts": "^4.0.2-alpha.7",
    ...
  }
```

Specify the following env variable

```
JMIX_SERVER_MOCK_GRAPHQL=path/to/schema.graphql
```

The mock server endpoints are available at the same port as dev server (e.g. http://localhost:3000/oauth/token)

> `proxy` configuration won't work once mock server is enabled