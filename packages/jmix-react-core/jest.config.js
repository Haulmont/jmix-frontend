module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "coverageThreshold": {
    "global": {
      "statements": 47,
      "branches": 45,
      "functions": 30,
      "lines": 46
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
