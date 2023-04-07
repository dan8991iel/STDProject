module.exports = {
    clearMocks: true,
    maxWorkers: "50%",
    collectCoverage: false,
    coverageProvider: "v8",
    testEnvironment: "node",
    cacheDirectory: ".jest/cache",
    coverageDirectory: ".jest/coverage",
    testPathIgnorePatterns: ["/node_modules/"],
    testEnvironment: 'node',
    testRegex: "tests/dkn/integration-tests/.*\\.test\\.js$",
  };