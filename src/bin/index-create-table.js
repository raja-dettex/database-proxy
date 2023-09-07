const { Command }  = require('commander')
const { Logger } = require('./middlewares/logger')
const fs = require('fs')
const { DatabaseClient } = require('../client/database.client')
const { objectToList } = require('./utils/encoder')
const program = new Command() 
const dbClient = new DatabaseClient();

program
    .option('-d, --dbname <dbname>', "specify the database name")
    .option('-s --schema <filename>', 'specify the schema file path')
    .option('-h --hostname <hostname>', 'specify host name')
    .option('-p --port <port>', 'specify port')
    .option('-u --username <username>', 'specify username')
    .option('-p --password <password>', 'specify password')
    .option('-t --tablename <tablename>', 'specify table name')
    .action( (str, options) => {
        const {  dbname, hostname, port, username, password, schema, tablename } = options._optionValues;
        fs.readFile(schema, 'utf8', async (err, data)=> {
            if (err) Logger.error(err)
            try {
                const dataObj = JSON.parse(data)
                var columnList = objectToList(dataObj)
                const res = await dbClient.createTable(hostname, port, password, username, dbname, tablename, columnList)
                res && Logger.info("table is created")
            } catch(err) {
                Logger.error(err)
            }
        })
    })
    .parse(process.argv)