const execa = require('execa')
const { resolveBin } = require('../utils')

const args = []

execa(resolveBin('validate-commit-msg'), args, { stdio: 'inherit' })
  .then(({ status }) => {
    process.exit(status)
  })
  .catch(({ code }) => {
    process.exit(code)
  })
