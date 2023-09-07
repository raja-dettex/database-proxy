const { Logger } = require("../bin/middlewares/logger");
const { DatabaseClient } = require("./database.client");

describe("database client", ()=> {
    let databaseClient;
    beforeEach(() => {
        databaseClient = new DatabaseClient();
    })
    it("test a dummy code ", ()=>{
        query = databaseClient.generateQuery("test_table", 4)
        Logger.info(query)
    })
})