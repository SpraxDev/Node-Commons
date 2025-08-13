/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'reports/coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/index.ts']
};
