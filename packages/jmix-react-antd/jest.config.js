module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "/node_modules/(antd|@ant-design|rc-.+?|@babel\/runtime).+(js|jsx)$": "babel-jest"
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!antd|@ant-design|rc-.+?|@babel\/runtime).+(js|jsx)$"
  ],
  "coverageThreshold": {
    "global": {
      "statements": 4,
      "branches": 2,
      "functions": 1,
      "lines": 4
    },
    "./src/ui/paging": {
      "statements": 81,
      "branches": 82,
      "functions": 90,
      "lines": 85
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
  ],
  "testEnvironment": "jsdom",

  // The reason behind this: due to the fact that jmix-react-core is symlinked,
  // it will use it's own instance of React, while the tests will use the one from jmix-react-ui/node_modules.
  // In case of FieldPermissionContainer.test.tsx that would result in an Invalid Hook Call,
  // apparently because the test transitively imports MainStore, which declares a custom hook.
  "moduleNameMapper": {
    "^react$": "<rootDir>/../jmix-react-core/node_modules/react",
    "^mobx-react$": "<rootDir>/../jmix-react-core/node_modules/mobx-react",
    "^@apollo/client$": "<rootDir>/../jmix-react-core/node_modules/@apollo/client",
    "^@apollo/client/testing$": "<rootDir>/../jmix-react-core/node_modules/@apollo/client/testing",
    "\\.(css|less)$":  "<rootDir>/src/test/styleMock.ts"
  },
  "setupFiles": [
    "./src/test/polyfills.js"
  ]
};