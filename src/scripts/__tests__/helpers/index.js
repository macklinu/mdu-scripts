let os = require('os')
let fs = require('fs')
let path = require('path')
let shortid = require('shortid')
let mkdirp = require('mkdirp')
let rimraf = require('rimraf')

function createTmpProject() {
  let tmp = os.tmpdir()
  let id = shortid.generate()
  let tmpProjectPath = path.resolve(tmp, 'mdu-scripts', id)

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
