module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "coverageThreshold": {
    "global": {
      "statements": 40,
      "branches": 39,
      "functions": 30,
      "lines": 40
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
  ],
  "coveragePathIgnorePatterns": [
    "src/index.ts", // This file only contains exports
    "src/test-doubles/*"
  ]
};
