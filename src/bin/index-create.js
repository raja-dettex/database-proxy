const {Command} =  require('commander')
const program = new Command();
const { Logger } = require('./middlewares/logger')

program
    .command("database", "used to create a database")
    .command("table", "used to create a table")
    .parse(process.argv)