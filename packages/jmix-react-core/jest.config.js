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
      "branches": 38,
      "functions": 28,
      "lines": 40
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
  ],
  "coveragePathIgnorePatterns": [
    "src/index.ts", // This file only contains exports
    "src/test-doubles/*"
  ],
  "setupFilesAfterEnv": ["jest-expect-message"],
  modulePathIgnorePatterns: ["src/timer/timer.test.ts", "src/app/Auth.test.ts"]
};
