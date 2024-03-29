// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: "./coverage",
    coverageReporters: [
        'json',
        'html',
        'lcov',
        'text',
    ],
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,js}",
        "<rootDir>/src/*.{ts,js}",
        "!<rootDir>/src/**/*.test.{ts,js}",
        "!<rootDir>/src/*.test.{ts,js}",
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
