#!/usr/bin/env node

require('yargs')
  .command(require('./add'))
  .demandCommand()
  .help().argv
