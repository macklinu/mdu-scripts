const slash = require('slash')

// Removes the quotes around strings.
const unquoteSerializer = {
  print: val => val,
  test: val => typeof val === 'string',
}

// Converts Windows-style file paths to Unix.
const winPathSerializer = {
  print: val => slash(val),
  test: val => typeof val === 'string' && val.includes('\\'),
}

const projectRootSerializer = {
  print: val => val.replace(process.cwd(), 'PROJECT_ROOT'),
  test: val => typeof val === 'string',
}

module.exports = {
  unquoteSerializer,
  winPathSerializer,
  projectRootSerializer,
}
