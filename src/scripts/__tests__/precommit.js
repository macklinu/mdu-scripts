const cases = require('jest-in-case')
const {
  unquoteSerializer,
  winPathSerializer,
  projectRootSerializer,
} = require('./helpers/serializers')

expect.addSnapshotSerializer(unquoteSerializer)
expect.addSnapshotSerializer(winPathSerializer)
expect.addSnapshotSerializer(projectRootSerializer)

cases(
  'precommit',
  ({
    args = [],
    utils = require('../../utils'),
    hasPkgProp = () => false,
    hasFile = () => false,
  }) => {
    // beforeEach
    const mockExeca = require('execa')
    Object.assign(utils, {
      hasPkgProp,
      hasFile,
      resolveBin: (modName, { executable = modName } = {}) => executable,
    })
    process.exit = jest.fn()

    process.argv = ['node', '../precommit', ...args]

    try {
      // tests
      require('../precommit')
      expect(mockExeca).toHaveBeenCalledTimes(1)
      const [firstCall] = mockExeca.mock.calls
      const [script, calledArgs] = firstCall
      expect([script, ...calledArgs].join(' ')).toMatchSnapshot()
    } catch (error) {
      throw error
    } finally {
      // afterEach
      jest.resetModules()
    }
  },
  {
    'calls lint-staged CLI with default args': {},
    'does not use built-in config with --config': {
      args: ['--config', './custom-config.js'],
    },
    'does not use built-in config with .lintstagedrc file': {
      hasFile: filename => filename === '.lintstagedrc',
    },
    'does not use built-in config with lint-staged.config.js file': {
      hasFile: filename => filename === 'lint-staged.config.js',
    },
    'does not use built-in config with lint-staged pkg prop': {
      hasPkgProp: prop => prop === 'lint-staged',
    },
    'forwards args': {
      args: ['--verbose'],
    },
  }
)
