const jestConfig = {
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!<rootDir>/node_modules/'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    coverageDirectory: './coverage',
    coverageReporters: ['text', 'text-summary', 'html', 'lcov'],
    watchPathIgnorePatterns: ['node_modules', 'coverage'],
    testResultProcessor: 'jest-sonar-reporter',
}

module.exports = jestConfig
