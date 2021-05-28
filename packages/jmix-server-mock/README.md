## Usage

### One-liner
```shell
npx @haulmont/jmix-server-mock schema.graphql
```

### Usage in Jmix Frontend

Make sure Haulmont react scripts are used

```json
  "dependencies": {
    ...
    "@haulmont/react-scripts": "^4.0.2-alpha.7",
    ...
  }
```

Specify the following env variable

```
JMIX_SERVER_MOCK=true
```

The mock server endpoints are available at the same port as dev server (e.g. http://localhost:3000/oauth/token)

> `proxy` configuration won't work once mock server is enabled