module.exports = {
  extends: ['prettier', 'prettier/react'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
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
