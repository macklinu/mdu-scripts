const cases = require('jest-in-case')
const {
  unquoteSerializer,
  winPathSerializer,
} = require('./helpers/serializers')

expect.addSnapshotSerializer(unquoteSerializer)
expect.addSnapshotSerializer(winPathSerializer)

cases(
  'format',
  ({ args }) => {
    // beforeEach
    const mockExeca = require('execa')
    const utils = require('../../utils')
    utils.resolveBin = (modName, { executable = modName } = {}) => executable
    process.exit = jest.fn()

    // tests
    process.argv = ['node', '../format', ...args]
    mockExeca.mockClear()
    require('../format')
    expect(mockExeca).toHaveBeenCalledTimes(1)
    const [firstCall] = mockExeca.mock.calls
    const [script, calledArgs] = firstCall
    expect([script, ...calledArgs].join(' ')).toMatchSnapshot()

    // afterEach
    jest.resetModules()
  },
  {
    'calls prettier CLI with args': {
      args: ['my-src/**/*.js'],
    },
    '--no-write prevents --write argument from being added': {
      args: ['--no-write'],
    },
    '--config arg can be used for a custom config': {
      args: ['--config', './my-config.js'],
    },
    '--ignore-path arg can be used for a custom ignore file': {
      args: ['--ignore-path', './.myignore'],
    },
  }
)
