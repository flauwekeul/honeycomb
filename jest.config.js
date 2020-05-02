module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // temporary until src-js is removed
  testPathIgnorePatterns: ['/node_modules/', '/src-js/'],
}
