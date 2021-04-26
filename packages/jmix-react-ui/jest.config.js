module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "coverageThreshold": {
    "global": {
      "statements": 4,
      "branches": 2,
      "functions": 1,
      "lines": 4
    },
    "./src/ui/paging": {
      "statements": 82,
      "branches": 82,
      "functions": 90,
      "lines": 85
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
  ],

  // The reason behind this: due to the fact that cuba-react-core is symlinked,
  // it will use it's own instance of React, while the tests will use the one from cuba-react-ui/node_modules.
  // In case of FieldPermissionContainer.test.tsx that would result in an Invalid Hook Call,
  // apparently because the test transitively imports MainStore, which declares a custom hook.
  "moduleNameMapper": {
    "^react$": "<rootDir>/../jmix-react-core/node_modules/react",
    "^mobx-react$": "<rootDir>/../jmix-react-core/node_modules/mobx-react"
  }
};
