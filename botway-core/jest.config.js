/** @type {import("jest").Config} */
export default {
  testEnvironment: "node",
  transform: {},
  extensionsToTreatAsEsm: [],
  testMatch: ["**/tests/**/*.test.js"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js", "!src/server.js"],
  // Let Jest resolve ESM modules properly
  moduleNameMapper: {},
};
