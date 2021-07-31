#!/usr/bin/env node
const program = require('commander');

const helpOptions = require('./lib/core/help');
const createCommands = require('./lib/core/create')
// version命令
program.version(require('./package.json').version, '-v, --version');

// help命令
helpOptions();
// create自定义命令
createCommands();

program.parse(process.argv);
