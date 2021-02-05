const connectDb = require('../db/db')
const { ObjectId } = require('mongodb')

module.exports = {
    getClients: async () => {
        let db
        let clients = []

        try {

            db = await connectDb()
            clients = await db.collection('clients').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return clients
    },
    getClient: async (root, { id }) => {
        let db
        let client

        try {

            db = await connectDb()
            client = await db.collection('clients').findOne({ _id: ObjectId(id) })

        } catch (err) {
            console.log(err)
        }

        return client
    }
}