const connectDb = require('../db/db')
const { ObjectID } = require('mongodb')

module.exports = {
    Client: {
        client: async ({ client }) => {

            let db
            let clientData
            let ids

            try {

                db = await connectDb()
                ids = client ? client.map(id => ObjectID(id)) : []
                clientData = ids.length > 0 ?
                    await db.collection('clients').find(
                        { _id: { $in: ids } }
                    ).toArray()
                    : []
            } catch(e) {
                errorHandler(e)
            }

            return clientData

        }
    }
}