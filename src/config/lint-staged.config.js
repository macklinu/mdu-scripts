const { resolveMduScripts, resolveBin } = require('../utils')

const mduScripts = resolveMduScripts()
const doctoc = resolveBin('doctoc')

module.exports = {
  concurrent: false,
  linters: {
    'README.md': [`${doctoc} --maxlevel 3 --notitle`, 'git add'],
    '**/*.+(js|json|ts|tsx|less|css|md)': [
      `${mduScripts} format`,
      `${mduScripts} lint`,
      `${mduScripts} test --findRelatedTests --passWithNoTests`,
      'git add',
    ],
  },
}
