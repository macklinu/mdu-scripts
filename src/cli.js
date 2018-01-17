#!/usr/bin/env node

let path = require('path')
let glob = require('glob')
let execa = require('execa')
let { stripIndents } = require('common-tags')
let { isHelp } = require('./utils')

let [executor, ignoredBin, script, ...args] = process.argv

if (!script || isHelp(script)) {
  printHelp()
} else {
  runScript()
}

function printHelp() {
  let scriptsPath = path.join(__dirname, 'scripts/')
  let scriptsAvailable = glob.sync(path.join(__dirname, 'scripts', '*'))
  let scriptsAvailableMessage = scriptsAvailable
    .map(path.normalize)
    .map(s =>
      s
        .replace(scriptsPath, '')
        .replace(/__tests__/, '')
        .replace(/\.js$/, '')
        .trim()
    )
    .map(s => `- ${s}`)
    .join('\n')

  let fullMessage = stripIndents`
    Usage: ${ignoredBin} [script] [--flags]

    Available Scripts:

      ${scriptsAvailableMessage}

    Options:
      All options depend on the script. Docs will be improved eventually, but for most scripts you can assume that the args you pass will be forwarded to the respective tool that's being run under the hood.`
  console.log(`\n${fullMessage}\n`)
}

function runScript() {
  let relativeScriptPath = path.join(__dirname, './scripts', script)
  let scriptPath = attemptResolve(relativeScriptPath)

  if (!scriptPath) {
    throw new Error(`Unknown script "${script}".`)
  }

  execa(executor, [scriptPath, ...args], {
    stdio: 'inherit',
  })
    .then(({ signal, status }) => {
      if (signal) {
        handleSignal(signal)
      } else {
        process.exit(status)
      }
    })
    .catch(({ code }) => {
      process.exit(code)
    })
}

function handleSignal(signal) {
  if (signal === 'SIGKILL') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    )
  } else if (signal === 'SIGTERM') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    )
  }
  process.exit(1)
}

function attemptResolve(...resolveArgs) {
  try {
    return require.resolve(...resolveArgs)
  } catch (error) {
    return null
  }
}
