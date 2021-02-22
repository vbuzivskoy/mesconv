#!/usr/bin/env node

import { Command } from 'commander';
import app from '..';

const program = new Command();
program
  .version('1.0.0')
  .usage('[options] <convertTaskFile>')
  .description('Converts one unit to another acording to task file')
  .arguments('<convertTaskFile>')
  .option('-e, --extend <extendTaskFile>', 'extends unit ratio base')
  .action((convertTaskFile, { extend }) => {
    console.log(app(convertTaskFile, extend));
  });

program.parse(process.argv);
