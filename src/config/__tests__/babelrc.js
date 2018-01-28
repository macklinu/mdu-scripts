afterEach(() => {
  jest.resetModules()
})

test('includes babel-preset-react when react is a dependency', () => {
  const config = setupBabelConfig({ hasAnyDep: dep => dep === 'react' })

  expect(config.presets).toEqual(
    expect.arrayContaining([expect.stringMatching(/babel-preset-react/)])
  )
})

test('does not include babel-preset-react when react is not a dependency', () => {
  const config = setupBabelConfig({ hasAnyDep: () => false })

  expect(config.presets).not.toEqual(
    expect.arrayContaining([expect.stringMatching(/babel-preset-react/)])
  )
})

test('includes babel-preset-flow when flow-bin is a dependency', () => {
  const config = setupBabelConfig({ hasAnyDep: dep => dep === 'flow-bin' })

  expect(config.presets).toEqual(
    expect.arrayContaining([expect.stringMatching(/babel-preset-flow/)])
  )
})

test('includes babel-preset-flow when a .flowconfig file is present', () => {
  const config = setupBabelConfig({ hasFile: file => file === '.flowconfig' })

  expect(config.presets).toEqual(
    expect.arrayContaining([expect.stringMatching(/babel-preset-flow/)])
  )
})

test('does not includes babel-preset-flow when missing .flowconfig or flow-bin dependency', () => {
  const config = setupBabelConfig({
    hasFile: () => false,
    hasAnyDep: () => false,
  })

  expect(config.presets).not.toEqual(
    expect.arrayContaining([expect.stringMatching(/babel-preset-flow/)])
  )
})

function setupBabelConfig({ hasAnyDep, hasFile }) {
  const utils = require('../../utils')
  Object.assign(utils, hasAnyDep && { hasAnyDep }, hasFile && { hasFile })
  return require('../babelrc')
}
