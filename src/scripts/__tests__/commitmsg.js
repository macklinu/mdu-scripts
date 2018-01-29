const {
  unquoteSerializer,
  winPathSerializer,
  projectRootSerializer,
} = require('./helpers/serializers')

expect.addSnapshotSerializer(unquoteSerializer)
expect.addSnapshotSerializer(winPathSerializer)
expect.addSnapshotSerializer(projectRootSerializer)

test('precommit executes validate-commit-msg with no args', () => {
  const mockExeca = require('execa')
  const utils = require('../../utils')
  Object.assign(utils, {
    resolveBin: (modName, { executable = modName } = {}) => executable,
  })
  process.exit = jest.fn()

  process.argv = ['node', '../commitmsg']

  try {
    // tests
    require('../commitmsg')
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
})
