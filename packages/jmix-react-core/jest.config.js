module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "coverageThreshold": {
    "global": {
      "statements": 39,
      "branches": 37,
      "functions": 28,
      "lines": 39
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
  ],
  "coveragePathIgnorePatterns": [
    "src/index.ts", // This file only contains exports
    "src/test-doubles/*"
  ],
  "setupFilesAfterEnv": ["jest-expect-message", "./src/test/polyfills.js"]
};
