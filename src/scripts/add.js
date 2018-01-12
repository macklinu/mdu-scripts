let path = require('path')
let fs = require('fs')
let util = require('util')
let chalk = require('chalk')
let { stripIndents } = require('common-tags')
let { isHelp } = require('../utils')

let readFile = util.promisify(fs.readFile)
let writeFile = util.promisify(fs.writeFile)

let filePath = filename => path.resolve(__dirname, '../', 'config', filename)

let pathMap = {
  editorconfig: filePath('.editorconfig'),
  prettier: filePath('prettier.config.js'),
  gitignore: filePath('.gitignore'),
  'lint-staged': filePath('lint-staged.config.js'),
}

let options = () => {
  return Object.keys(pathMap)
    .map(key => `- ${key}`)
    .join('\n')
}

let args = process.argv.slice(2) || []

if (isHelp(args[0])) {
  printHelp()
} else {
  runScript(args)
}

function printHelp() {
  let helpMessage = stripIndents`
    add [files...]

    Writes config files to the current directory for given file types. Possible options are:

    ${options()}
  `
  console.log(helpMessage)
}

function runScript(files) {
  if (files.length === 0) {
    console.error(`Please supply at least one valid option:\n\n${options()}`)
    process.exit(1)
  } else {
    let filePaths = files
      .map(f => {
        let file = pathMap[f]
        if (!file) {
          console.log(chalk.yellow(`Couldn't find a file for ${chalk.bold(f)}`))
        }
        return file
      })
      .filter(Boolean)

    return Promise.all(
      filePaths.map(async fp => {
        let { base } = path.parse(fp)
        let file = await readFile(fp, 'utf8')
        let newPath = path.resolve(process.cwd(), base)
        console.log(chalk.green(`Wrote file ${chalk.bold(newPath)}`))
        return await writeFile(newPath, file, 'utf8')
      })
    )
      .then(_ => console.log('Done!'))
      .catch(_ => console.error('😱 Something went wrong!'))
  }
}
