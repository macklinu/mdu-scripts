module.exports = Object.assign({}, require('./src/config/jest.config'), {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
})
