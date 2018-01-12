let { jest } = require('./src/config')

module.exports = Object.assign({}, jest, {
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
})
