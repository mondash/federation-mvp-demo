import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  rootDir: "..",
  modulePaths: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/config/jest.setup.ts"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/build"],
  verbose: true,

  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: ["/__generated__/"],

  watchPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/build"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};

export default config;
