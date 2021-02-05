const connectDb = require('../db/db')
const { ObjectID } = require('mongodb')
const console = require('console')

module.exports = {
    createClient: async (root, { input }) => {
        let db
        let client

        const newClient = input

        try {

            db = await connectDb()
            client = await db.collection('clients').insertOne(newClient)
            console.log(client.insertedId)
            newClient._id = client.insertedId

        } catch (e) {
            console.log(e)
        }

        return newClient
    },
    editClient: async (root, { _id, input }) => {
        let db
        let client

        try {
            db = await connectDb()
            client = await db.collection('clients').updateOne(
                {_id: ObjectID(_id)},
                { $set: input }
            )

            client = await db.collection('clients').findOne({_id: ObjectID(_id)})

            console.log(input)
        } catch (e) {
            console.log(e)
        }

        return client
    } 
}