#! /usr/bin/env node
const {Command} =  require('commander')
const program = new Command();
const pkg = require('../../package.json')

program
    .version(pkg.version)
    .command("create", "is used to create db migration file")
    .parse(process.argv)
    .action(()=> {
        
    })

