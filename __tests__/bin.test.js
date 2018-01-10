let os = require('os')
let execa = require('execa')
let path = require('path')

let bin = path.resolve(__dirname, '../', 'bin')

let run = (command = '') => {
  return execa.shell(`node ${bin} ${command}`.trim(), {
    cwd: os.tmpdir(),
  })
}

let fail = () => {
  throw Error('Fail')
}

describe('command: add', () => {
  test('writes files', () => {
    return run('add editorconfig prettier gitignore')
      .then(({ stdout, code }) => {
        expect(code).toBe(0)
        expect(stdout).toContain('prettier.config.js')
        expect(stdout).toContain('.editorconfig')
        expect(stdout).toContain('.gitignore')
      })
      .catch(fail)
  })

  test('running add without files should exit with error', () => {
    return run('add')
      .then(fail)
      .catch(({ code, stderr }) => {
        expect(code).toBe(1)
        expect(stderr).toContain('Please supply at least one valid option')
      })
  })

  test('requires a command', () => {
    return run()
      .then(fail)
      .catch(({ code, stderr }) => {
        expect(code).toBe(1)
        expect(stderr).toContain('Not enough non-option arguments')
      })
  })

  test('warns for unsupported file options', () => {
    return run('add nope')
      .then(({ stdout, code }) => {
        expect(code).toBe(0)
        expect(stdout).toContain("Couldn't find a file for nope")
      })
      .catch(fail)
  })
})
