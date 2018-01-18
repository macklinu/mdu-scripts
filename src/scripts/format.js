const path = require('path')
const execa = require('execa')
const yargsParser = require('yargs-parser')
const { hasPkgProp, resolveBin, hasFile } = require('../utils')

const args = process.argv.slice(2)
const parsedArgs = yargsParser(args)

const here = p => path.join(__dirname, p)
const hereRelative = p => here(p).replace(process.cwd(), '.')

const useBuiltinConfig =
  !args.includes('--config') &&
  !hasFile('.prettierrc') &&
  !hasFile('prettier.config.js') &&
  !hasPkgProp('prettier')
const config = useBuiltinConfig
  ? ['--config', hereRelative('../config/prettier.config.js')]
  : []

const useBuiltinIgnore =
  !args.includes('--ignore-path') && !hasFile('.prettierignore')
const ignore = useBuiltinIgnore
  ? ['--ignore-path', hereRelative('../config/.prettierignore')]
  : []

const write = args.includes('--no-write') ? [] : ['--write']

// this ensures that when running format as a pre-commit hook and we get
// the full file path, we make that non-absolute so it is treated as a glob,
// This way the prettierignore will be applied
const relativeArgs = args.map(a => a.replace(`${process.cwd()}/`, ''))

const filesToApply = parsedArgs._.length
  ? []
  : ['**/*.+(js|json|less|css|ts|tsx|md)']

execa(
  resolveBin('prettier'),
  [...config, ...ignore, ...write, ...filesToApply].concat(relativeArgs),
  { stdio: 'inherit' }
)
  .then(({ status }) => {
    process.exit(status)
  })
  .catch(({ code }) => {
    process.exit(code)
  })
