/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  testRunner: 'jest',
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',

  reporters: ['html', 'clear-text', 'progress'],
  coverageAnalysis: 'perTest'
};
