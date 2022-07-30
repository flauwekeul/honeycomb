module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/unified-signatures': ['off'],
        '@typescript-eslint/no-unnecessary-condition': ['off'],
      },
    },
    {
      files: ['*.test.ts'],
      extends: ['plugin:jest/recommended'],
    },
  ],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
}
