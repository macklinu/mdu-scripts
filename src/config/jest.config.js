const ignores = [
  '/node_modules/',
  '/fixtures/',
  '/__tests__/helpers/',
  '__mocks__',
]

module.exports = {
  testPathIgnorePatterns: [...ignores],
}
