afterEach(() => {
  jest.resetModules()
})

test('includes babel-preset-react when react is a dependency', () => {
  const utils = require('../../utils')
  Object.assign(utils, {
    hasAnyDep: arg => arg === 'react',
  })
  const config = require('../babelrc')

  expect(config.presets).toEqual(
    expect.arrayContaining([expect.stringMatching(/babel-preset-react/)])
  )
})

test('does not include babel-preset-react when react is not a dependency', () => {
  const utils = require('../../utils')
  Object.assign(utils, {
    hasAnyDep: () => false,
  })
  const config = require('../babelrc')

  expect(config.presets).not.toEqual(
    expect.arrayContaining([expect.stringMatching(/babel-preset-react/)])
  )
})
