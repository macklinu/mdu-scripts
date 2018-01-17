const { jest } = require('./src')

module.exports = Object.assign({}, jest, {
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
})
