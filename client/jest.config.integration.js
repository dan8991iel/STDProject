module.exports = {
    clearMocks: true,
    maxWorkers: "50%",
    collectCoverage: true,
    coverageProvider: "v8",
    testEnvironment: "node",
    cacheDirectory: ".jest/cache",
    coverageDirectory: ".jest/coverage",
    testPathIgnorePatterns: ["/node_modules/"],
    testRegex: "tests/dkn/integration-tests/.*\\.test\\.js$",
  };