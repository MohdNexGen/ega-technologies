module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  ignorePatterns: ['dist', '.expo', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks/immutability': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', 'ignoreRestSiblings': true }],
    'no-use-before-define': ['error', { functions: false, classes: true, variables: false, allowNamedExports: true }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true, variables: false, typedefs: true }],
  },
}
