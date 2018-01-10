require('yargs')
  .command(require('./add'))
  .demandCommand()
  .help().argv
