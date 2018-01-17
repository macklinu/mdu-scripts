let path = require('path')
let execa = require('execa')
let yargsParser = require('yargs-parser')
let { hasPkgProp, resolveBin, hasFile } = require('../utils')

let args = process.argv.slice(2)
let here = p => path.join(__dirname, p)
let hereRelative = p => here(p).replace(process.cwd(), '.')
let parsedArgs = yargsParser(args)

let useBuiltinConfig =
  !args.includes('--config') &&
  !hasFile('.eslintrc') &&
  !hasFile('.eslintrc.js') &&
  !hasPkgProp('eslintConfig')

let config = useBuiltinConfig
  ? ['--config', hereRelative('../config/.eslintrc.js')]
  : []

let useBuiltinIgnore =
  !args.includes('--ignore-path') &&
  !hasFile('.eslintignore') &&
  !hasPkgProp('eslintIgnore')

let ignore = useBuiltinIgnore
  ? ['--ignore-path', hereRelative('../config/.eslintignore')]
  : []

let cache = args.includes('--no-cache') ? [] : ['--cache']

let filesGiven = parsedArgs._.length > 0

let filesToApply = filesGiven ? [] : ['.']

if (filesGiven) {
  // we need to take all the flag-less arguments (the files that should be linted)
  // and filter out the ones that aren't js files. Otherwise json or css files
  // may be passed through
  args = args.filter(a => !parsedArgs._.includes(a) || a.endsWith('.js'))
}

execa(
  resolveBin('eslint'),
  [...config, ...ignore, ...cache, ...args, ...filesToApply],
  { stdio: 'inherit' }
)
  .then(({ status }) => {
    process.exit(status)
  })
  .catch(({ code }) => {
    process.exit(code)
  })
