import cases from 'jest-in-case'

cases(
  'jest.testEnvironment',
  ({ hasAnyDep, testEnvironment }) => {
    const utils = require('../../utils')
    Object.assign(utils, {
      hasAnyDep,
    })
    const config = require('../jest.config')

    expect(config.testEnvironment).toBe(testEnvironment)

    jest.resetModules()
  },
  {
    'uses jsdom test environment when react is a dependency': {
      hasAnyDep: dep => dep === 'react',
      testEnvironment: 'jsdom',
    },
    'uses node test environment when react is not a dependency': {
      hasAnyDep: () => false,
      testEnvironment: 'node',
    },
  }
)
