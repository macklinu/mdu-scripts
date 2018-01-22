const path = require('path')
const execa = require('execa')
const { hasPkgProp, hasFile, resolveBin } = require('../utils')

const here = p => path.join(__dirname, p)

const args = process.argv.slice(2)

const useBuiltInConfig =
  !args.includes('--config') &&
  !hasFile('.lintstagedrc') &&
  !hasFile('lint-staged.config.js') &&
  !hasPkgProp('lint-staged')

const config = useBuiltInConfig
  ? ['--config', here('../config/lint-staged.config.js')]
  : []

execa(resolveBin('lint-staged'), [...config, ...args], { stdio: 'inherit' })
  .then(({ status }) => {
    process.exit(status)
  })
  .catch(({ code }) => {
    process.exit(code)
  })
