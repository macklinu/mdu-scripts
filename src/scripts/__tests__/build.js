const cases = require('jest-in-case')
const {
  unquoteSerializer,
  winPathSerializer,
} = require('./helpers/serializers')

expect.addSnapshotSerializer(unquoteSerializer)
expect.addSnapshotSerializer(winPathSerializer)
expect.addSnapshotSerializer({
  print: val => val.replace(process.cwd(), 'PROJECT_ROOT'),
  test: val => typeof val === 'string',
})

jest.mock('rimraf', () => ({
  sync: () => {},
}))

cases(
  'build',
  ({ args = [] }) => {
    // beforeEach
    const mockExeca = require('execa')
    const utils = require('../../utils')
    utils.resolveBin = (modName, { executable = modName } = {}) => executable
    process.exit = jest.fn()

    // tests
    process.argv = ['node', '../build', ...args]
    mockExeca.mockClear()
    require('../build')
    expect(mockExeca).toHaveBeenCalledTimes(1)
    const [firstCall] = mockExeca.mock.calls
    const [script, calledArgs] = firstCall
    expect([script, ...calledArgs].join(' ')).toMatchSnapshot()

    // afterEach
    jest.resetModules()
  },
  {
    'calls babel with default args': {},
    'honors custom config': {
      args: ['--config', './my-config.js'],
    },
    'honors custom ignore': {
      args: ['--ignore', '__someDir__'],
    },
    'honors --no-copy-files': {
      args: ['--no-copy-files'],
    },
    'honors custom out dir': {
      args: ['--out-dir', 'destination'],
    },
  }
)
