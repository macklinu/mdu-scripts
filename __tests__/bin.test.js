let os = require('os')
let execa = require('execa')
let path = require('path')

let bin = path.resolve(__dirname, '../', 'bin')

let run = (command = '') => {
  return execa.shell(`node ${bin} ${command}`.trim(), {
    cwd: os.tmpdir(),
  })
}

describe('command: add', () => {
  test('writes files', () => {
    return run('add editorconfig prettier gitignore lint-staged').then(
      ({ stdout, code }) => {
        expect(code).toBe(0)
        expect(stdout).toContain('prettier.config.js')
        expect(stdout).toContain('.editorconfig')
        expect(stdout).toContain('.gitignore')
        expect(stdout).toContain('lint-staged.config.js')
      }
    )
  })

  test('running add without files should exit with error', () => {
    return run('add').catch(({ code, stderr }) => {
      expect(code).toBe(1)
      expect(stderr).toContain('Please supply at least one valid option')
    })
  })

  test('requires a command', () => {
    return run().catch(({ code, stderr }) => {
      expect(code).toBe(1)
      expect(stderr).toContain('Not enough non-option arguments')
    })
  })

  test('warns for unsupported file options', () => {
    return run('add nope').then(({ stdout, code }) => {
      expect(code).toBe(0)
      expect(stdout).toContain("Couldn't find a file for nope")
    })
  })
})
