const os = require('os')
const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

function createTmpProject() {
  const tmp = os.tmpdir()
  const id = shortid.generate()
  const tmpProjectPath = path.resolve(tmp, 'mdu-scripts', id)

  mkdirp.sync(tmpProjectPath)

  fs.writeFileSync(
    path.resolve(tmpProjectPath, 'package.json'),
    JSON.stringify({
      name: `mdu-scripts-${id}`,
    }),
    'utf8'
  )

  return tmpProjectPath
}

function deleteTmpProject(tmp) {
  rimraf.sync(tmp)
}

module.exports = {
  createTmpProject,
  deleteTmpProject,
}
