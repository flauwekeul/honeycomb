module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
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
        '@typescript-eslint/restrict-template-expressions': ['error', { allowBoolean: true, allowNullish: true }],
      },
    },
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': ['off'],
      },
    },
  ],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'object-shorthand': ['error'],
  },
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
}
