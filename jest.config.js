module.exports = Object.assign({}, require('./src').jest, {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
})
