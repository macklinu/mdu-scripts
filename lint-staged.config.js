module.exports = {
  '*.{json,js,ts,tsx}': ['node src/cli format --write', 'git add'],
}
