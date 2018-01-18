const cases = require('jest-in-case')
const {
  unquoteSerializer,
  winPathSerializer,
} = require('./helpers/serializers')

expect.addSnapshotSerializer(unquoteSerializer)
expect.addSnapshotSerializer(winPathSerializer)

jest.mock('jest', () => ({ run: jest.fn() }))
jest.mock('../../config/jest.config', () => ({ builtInConfig: true }))
let mockIsCI = false
jest.mock('is-ci', () => mockIsCI)

cases(
  'test',
  ({
    args = [],
    utils = require('../../utils'),
    pkgHasJestProp = false,
    hasJestConfigFile = false,
    ci = false,
  }) => {
    // beforeEach
    const { run: jestRunMock } = require('jest')
    mockIsCI = ci
    Object.assign(utils, {
      hasPkgProp: () => pkgHasJestProp,
      hasFile: () => hasJestConfigFile,
    })
    process.exit = jest.fn()

    process.argv = ['node', '../test', ...args]
    jestRunMock.mockClear()

    try {
      // tests
      require('../test')
      expect(jestRunMock).toHaveBeenCalledTimes(1)
      const [firstCall] = jestRunMock.mock.calls
      const [jestArgs] = firstCall
      expect(jestArgs.join(' ')).toMatchSnapshot()
    } catch (error) {
      throw error
    } finally {
      // afterEach
      jest.resetModules()
    }
  },
  {
    'calls jest.run with default args': {},
    'does not watch on CI': {
      ci: true,
    },
    'does not watch with --no-watch': {
      args: ['--no-watch'],
    },
    'does not watch with --coverage': {
      args: ['--coverage'],
    },
    'does not watch --updateSnapshot': {
      args: ['--updateSnapshot'],
    },
    'uses custom config with --config': {
      args: ['--config', './my-config.js'],
    },
    'uses custom config with jest prop in pkg': {
      pkgHasJestProp: true,
    },
    'uses custom config with jest.config.js file': {
      hasJestConfigFile: true,
    },
    'forwards args': {
      args: ['--coverage', '--watch'],
    },
  }
)
