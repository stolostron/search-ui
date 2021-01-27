module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageThreshold: {
      global: {
          "statements": 50,
          "branches": 50,
          "functions": 50,
          "lines": 50
      }
  },
  coverageReporters: [
      'json',
      'html',
      'lcov',
      'text',
  ],
  collectCoverageFrom: [
      "<rootDir>/src/**/*.{ts,js}",
      "<rootDir>/src/*.{ts,js}",
      "!<rootDir>/node_modules/**"
  ],
  setupFiles: [
      "<rootDir>/test/jest.setup.js"
  ],
  reporters: [
      "default"
  ],
  testResultsProcessor: "jest-sonar-reporter"
};
