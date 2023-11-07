/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/def/(.*)$": "<rootDir>/src/lib/definitions/$1",
    "^@/env/(.*)$": "<rootDir>/src/environment/$1",
    "^@/test/(.*)$": "<rootDir>/src/__tests__/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    database: "<rootDir>/src/lib/database",
  },
  setupFiles: ["<rootDir>/src/__tests__/setEnvVars.ts"],
  modulePathIgnorePatterns: ["<rootDir>/src/__tests__/setEnvVars.ts"],
  moduleFileExtensions: ["js", "ts", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
