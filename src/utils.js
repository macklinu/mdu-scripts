let fs = require('fs')
let path = require('path')
let arrify = require('arrify')
let has = require('lodash.has')
let readPkgUp = require('read-pkg-up')
let which = require('which')

let { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})
let appDirectory = path.dirname(pkgPath)

let fromRoot = (...p) => path.join(appDirectory, ...p)
let hasFile = (...p) => fs.existsSync(fromRoot(...p))

let hasPkgProp = props => arrify(props).some(prop => has(pkg, prop))

let isHelp = arg => arg === '--help' || arg === '-h'

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

module.exports = {
  appDirectory,
  fromRoot,
  hasFile,
  hasPkgProp,
  pkg,
  isHelp,
  resolveBin,
}
