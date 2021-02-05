const { MongoClient } = require('mongodb')

const {
    DB_NAME
} = require('../utils/config')

const mongoUrl = `mongodb://localhost/${DB_NAME}`

let connection 

async function connectDB() {
    if(connection) return connection

    let client 

    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        connection = client.db(DB_NAME)
    }
    catch (e) {
        console.error('could not connect to db ', mongoUrl, e)
        process.exit(1)
    }
    
    return connection

}

module.exports = connectDB