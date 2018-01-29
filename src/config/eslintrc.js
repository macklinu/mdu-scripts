const { hasAnyDep } = require('../utils')

const usingReact = hasAnyDep('react')

module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    usingReact && 'prettier/react',
    usingReact && 'plugin:react/recommended',
    usingReact && 'plugin:jsx-a11y/recommended',
  ].filter(Boolean),
  plugins: ['jest', usingReact && 'react', usingReact && 'jsx-a11y'].filter(
    Boolean
  ),
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    'jest/globals': true,
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'array-callback-return': 'warn',
    eqeqeq: ['error', 'smart'],
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-path-concat': 'error',
    'no-template-curly-in-string': 'warn',
    'no-throw-literal': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-with': 'error',
    'prefer-const': 'error',
    radix: 'error',
    'require-await': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-be-null': 'warn',
    'jest/prefer-to-be-undefined': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest/valid-expect-in-promise': 'error',
  },
}
