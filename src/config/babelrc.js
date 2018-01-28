const { hasAnyDep, parseEnv, hasFile } = require('../utils')

const isTest = (process.env.BABEL_ENV || process.env.NODE_ENV) === 'test'
const isRollup = parseEnv('BUILD_ROLLUP', false)
const treeshake = parseEnv('BUILD_TREESHAKE', isRollup)

const envModules = treeshake ? { modules: false } : {}
const envTargets = isTest
  ? { node: 'current' }
  : isRollup ? { browsers: ['ie 10', 'ios 7'] } : { node: 8 }
const envOptions = Object.assign({}, envModules, { targets: envTargets })

const usingReact = hasAnyDep('react')
const usingFlow = hasAnyDep('flow-bin') || hasFile('.flowconfig')

module.exports = {
  presets: [
    [require.resolve('babel-preset-env'), envOptions],
    require.resolve('babel-preset-stage-2'),
    usingReact && require.resolve('babel-preset-react'),
    usingFlow && require.resolve('babel-preset-flow'),
  ].filter(Boolean),
}
