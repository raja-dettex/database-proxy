const {Client} = require('pg');
const { Logger } = require('../bin/middlewares/logger');

class DatabaseClient  {
    constructor() {
    }
    async createDatabase(host, port, password, user, dbName) {
        const client = new Client({
            host: host,
            user: user,
            password: password, 
            port: port
        })
        
        try {
            await client.connect()
            
            const result = await client.query(this.generateCreatedbQuery(dbName))
            Logger.info("created")
            return true
        } catch(err) {
            Logger.error(err.message)
            return false
        } finally {
            await client.end()
        }
    }

    async createTable(host, port, password, user, dbName, tableName, columns) {
        const client = new Client({
            host: host,
            user: user,
            password: password, 
            port: port,
            database: dbName
        })
        
        try {
            await client.connect()
            const createTableQuery = this.generateQuery(tableName, columns)
            Logger.info(createTableQuery)
            const result = await client.query(createTableQuery)
            Logger.info(result)
            return true
        } catch(err) {
            Logger.error(err)
            return false
        } finally {
            await client.end()
        }
    }

    generateQuery(tableName, columns) {
        console.log(columns)
        let baseQuery = `CREATE TABLE ${tableName}(`
        for(let index = 0; index < columns.length; index++) {
            if(index == 0) {
                baseQuery += ` ${columns[index]}`
                continue;
            }
            if(index == 1) {
                baseQuery += ` ${columns[index]} PRIMARY KEY`
                continue;
            }
            else if(index%2 != 0) {
                baseQuery += ` ${columns[index]}`
                continue;
            }
            baseQuery += `, ${columns[index]}`
        }
        baseQuery += `);`
        return baseQuery;
    }

    generateCreatedbQuery(dbName) {
        return `CREATE DATABASE ${dbName};`
    }

    
}

module.exports = { DatabaseClient }
