const { Command }  = require('commander')
const { Logger } = require('./middlewares/logger')
const { DatabaseClient } = require('../client/database.client')
const program = new Command() 
const dbClient = new DatabaseClient();

program
    .option('-d, --dbname <dbname>', "specify the database name")
    .option('-h --hostname <hostname>', 'specify host name')
    .option('-p --port <port>', 'specify port')
    .option('-u --username <username>', 'specify username')
    .option('-p --password <password>', 'specify password')
    .action((str, options) => {
        const {  dbname, hostname, port, username, password } = options._optionValues;
        dbClient.createDatabase(hostname, port, password, username, dbname)
    })
    .parse(process.argv)