const path = require('path')
const { fromRoot, hasFile, hasPkgProp } = require('../utils')

const here = p => path.join(__dirname, p)
const useBuiltInBabelConfig = !hasFile('.babelrc') && !hasPkgProp('babel')

const ignores = [
  '/node_modules/',
  '/fixtures/',
  '/__tests__/helpers/',
  '__mocks__',
]

module.exports = Object.assign(
  {
    roots: [fromRoot('src')],
    testPathIgnorePatterns: [...ignores],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)'],
    coveragePathIgnorePatterns: [...ignores],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  },
  useBuiltInBabelConfig && {
    transform: { '^.+\\.js$': here('./babel-transform') },
  }
)
