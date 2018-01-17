/* eslint-disable no-console */

const path = require('path')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { stripIndents } = require('common-tags')
const { isHelp } = require('../utils')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const filePath = filename => path.resolve(__dirname, '../', 'config', filename)

const pathMap = {
  editorconfig: filePath('.editorconfig'),
  prettier: filePath('prettier.config.js'),
  gitignore: filePath('.gitignore'),
  'lint-staged': filePath('lint-staged.config.js'),
}

const options = () => {
  return Object.keys(pathMap)
    .map(key => `- ${key}`)
    .join('\n')
}

const args = process.argv.slice(2) || []

if (isHelp(args[0])) {
  printHelp()
} else {
  runScript(args)
}

function printHelp() {
  const helpMessage = stripIndents`
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
    const filePaths = files
      .map(f => {
        const file = pathMap[f]
        if (!file) {
          console.log(chalk.yellow(`Couldn't find a file for ${chalk.bold(f)}`))
        }
        return file
      })
      .filter(Boolean)

    return Promise.all(
      filePaths.map(async fp => {
        const { base } = path.parse(fp)
        const file = await readFile(fp, 'utf8')
        const newPath = path.resolve(process.cwd(), base)
        console.log(chalk.green(`Wrote file ${chalk.bold(newPath)}`))
        return await writeFile(newPath, file, 'utf8')
      })
    )
      .then(_ => console.log('Done!'))
      .catch(_ => console.error('😱 Something went wrong!'))
  }
}
