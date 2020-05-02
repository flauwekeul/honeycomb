module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
}
