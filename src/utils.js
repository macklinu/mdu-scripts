let fs = require('fs')
let path = require('path')
let arrify = require('arrify')
let has = require('lodash.has')
let readPkgUp = require('read-pkg-up')

let { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})
let appDirectory = path.dirname(pkgPath)

let fromRoot = (...p) => path.join(appDirectory, ...p)
let hasFile = (...p) => fs.existsSync(fromRoot(...p))

let hasPkgProp = props => arrify(props).some(prop => has(pkg, prop))

let isHelp = arg => arg === '--help' || arg === '-h'

module.exports = {
  appDirectory,
  fromRoot,
  hasFile,
  hasPkgProp,
  pkg,
  isHelp,
}
