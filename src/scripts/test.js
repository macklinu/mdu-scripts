process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

let isCI = require('is-ci')
let { hasPkgProp, hasFile } = require('../utils')

let args = process.argv.slice(2)

let watch =
  !isCI &&
  !args.includes('--no-watch') &&
  !args.includes('--coverage') &&
  !args.includes('--updateSnapshot')
    ? ['--watch']
    : []

let config =
  !args.includes('--config') &&
  !hasFile('jest.config.js') &&
  !hasPkgProp('jest')
    ? ['--config', JSON.stringify(require('../config/jest.config'))]
    : []

require('jest').run([...config, ...watch, ...args])
