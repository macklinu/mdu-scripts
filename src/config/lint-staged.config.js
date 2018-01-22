const { resolveMduScripts } = require('../utils')

const mduScripts = resolveMduScripts()

module.exports = {
  linters: {
    '**/*.+(js|json|ts|tsx|less|css)': [
      `${mduScripts} format`,
      `${mduScripts} lint`,
      'git add',
    ],
  },
}
