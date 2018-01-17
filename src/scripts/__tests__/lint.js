const cases = require('jest-in-case')
const {
  unquoteSerializer,
  winPathSerializer,
} = require('./helpers/serializers')

expect.addSnapshotSerializer(unquoteSerializer)
expect.addSnapshotSerializer(winPathSerializer)

cases(
  'lint',
  ({
    args = [],
    utils = require('../../utils'),
    hasPkgProp = () => false,
    hasFile = () => false,
    setup = () => () => {},
  }) => {
    // beforeEach
    const mockExeca = require('execa')
    Object.assign(utils, {
      hasPkgProp,
      hasFile,
      resolveBin: (modName, { executable = modName } = {}) => executable,
    })
    process.exit = jest.fn()
    const teardown = setup()

    process.argv = ['node', '../lint', ...args]

    try {
      // tests
      require('../lint')
      expect(mockExeca).toHaveBeenCalledTimes(1)
      const [firstCall] = mockExeca.mock.calls
      const [script, calledArgs] = firstCall
      expect([script, ...calledArgs].join(' ')).toMatchSnapshot()
    } catch (error) {
      throw error
    } finally {
      teardown()
      // afterEach
      jest.resetModules()
    }
  },
  {
    'calls eslint CLI with default args': {},
    'does not use built-in config with --config': {
      args: ['--config', './custom-config.js'],
    },
    'does not use built-in config with .eslintrc file': {
      hasFile: filename => filename === '.eslintrc',
    },
    'does not use built-in config with .eslintrc.js file': {
      hasFile: filename => filename === '.eslintrc.js',
    },
    'does not use built-in config with eslintConfig pkg prop': {
      hasPkgProp: prop => prop === 'eslintConfig',
    },
    'does not use built-in ignore with --ignore-path': {
      args: ['--ignore-path', './my-ignore'],
    },
    'does not use built-in ignore with .eslintignore file': {
      hasFile: filename => filename === '.eslintignore',
    },
    'does not use built-in ignore with eslintIgnore pkg prop': {
      hasPkgProp: prop => prop === 'eslintIgnore',
    },
    '--no-cache will disable caching': {
      args: ['--no-cache'],
    },
    'runs on given files, but only js files': {
      args: [
        './src/index.js',
        './package.json',
        './src/index.css',
        './src/component.js',
      ],
    },
  }
)
