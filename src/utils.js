const fs = require('fs')
const path = require('path')
const arrify = require('arrify')
const has = require('lodash.has')
const readPkgUp = require('read-pkg-up')
const which = require('which')

const { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})
const appDirectory = path.dirname(pkgPath)

const fromRoot = (...p) => path.join(appDirectory, ...p)
const hasFile = (...p) => fs.existsSync(fromRoot(...p))

const hasPkgProp = props => arrify(props).some(prop => has(pkg, prop))
const hasPkgSubProp = pkgProp => props =>
  hasPkgProp(arrify(props).map(p => `${pkgProp}.${p}`))

const hasPeerDep = hasPkgSubProp('peerDependencies')
const hasDep = hasPkgSubProp('dependencies')
const hasDevDep = hasPkgSubProp('devDependencies')
const hasAnyDep = args => [hasDep, hasDevDep, hasPeerDep].some(fn => fn(args))

const isHelp = arg => arg === '--help' || arg === '-h'

function resolveBin(
  modName,
  { executable = modName, cwd = process.cwd() } = {}
) {
  let pathFromWhich
  try {
    pathFromWhich = fs.realpathSync(which.sync(executable))
  } catch (_error) {
    // ignore _error
  }
  try {
    const modPkgPath = require.resolve(`${modName}/package.json`)
    const modPkgDir = path.dirname(modPkgPath)
    const { bin } = require(modPkgPath)
    const binPath = typeof bin === 'string' ? bin : bin[executable]
    const fullPathToBin = path.join(modPkgDir, binPath)
    if (fullPathToBin === pathFromWhich) {
      return executable
    }
    return fullPathToBin.replace(cwd, '.')
  } catch (error) {
    if (pathFromWhich) {
      return executable
    }
    throw error
  }
}

function resolveMduScripts() {
  if (pkg.name === 'mdu-scripts') {
    return require.resolve('./cli').replace(process.cwd(), '.')
  }
  return resolveBin('mdu-scripts')
}

module.exports = {
  appDirectory,
  fromRoot,
  hasFile,
  hasPkgProp,
  hasAnyDep,
  pkg,
  isHelp,
  resolveBin,
  resolveMduScripts,
}
