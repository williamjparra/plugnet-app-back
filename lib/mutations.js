const connectDb = require('../db/db')
const { ObjectID } = require('mongodb')
const console = require('console')

module.exports = {
    createClient: async (root, { input }) => {
        let db
        let client

        const newClient = input

        console.log(input)

        try {

            db = await connectDb()
            client = await db.collection('clients').insertOne(newClient)
            console.log(client.insertedId)
            console.log(newClient)
            newClient._id = client.insertedId

        } catch (e) {
            console.log(e)
            return e
        }

        console.log(newClient)
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
    },
    createContract: async (root, { input }) => {
        let db
        let contract

        const newContract = input

        try {

            db = await connectDb()
            contract = await db.collection('contracts').insertOne(newContract)
            newContract._id = contract.insertedId            

        } catch(e) {
            console.log(e)
        }

        return newContract
    },
    editContract: async (root, { _id, input }) => {
        let db
        let contract

        try {
            db = await connectDb()
            contract = await db.collection('contracts').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            
            contract = await db.collection('contracts').findOne({ _id: ObjectID(_id)})

        } catch (e) {
            console.log(e)
        }
        return contract
    },
    createSector: async (root, { input }) => {
        let db
        let sector
        console.log(input)
        const newSector = {...input}

        try {
            db = await connectDb()
            sector = await db.collection('sectors').insertOne(newSector)
            newSector._id = sector.insertedId
        } catch (error) {
            console.log(error)
        }

        return newSector
    },
    editSector: async (root, { _id, input }) => {
        let db
        let sector

        try {
            db = await connectDb()
            sector = await db.collection('sectors').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            sector = await db.collection('sectors').findOne({ _id: ObjectID(_id)})
        } catch (error) { 
            console.log(error)
        }

        return sector
    },
    createBorderRouter: async (root, { input }) => {
        let db
        let borderRouter

        const newBorderRouter = {...input}

        try {
            db = await connectDb()
            borderRouter = await db.collection('borderrouters').insertOne(newBorderRouter)
            newBorderRouter._id = borderRouter.insertedId
        } catch (error) {
            console.log(error)
        }
        
        return newBorderRouter
    },
    editBorderRouter: async (root, { _id, input }) => {
        let db
        let borderRouter

        try {
            db = await connectDb()
            borderRouter = await db.collection('borderrouters').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            borderRouter = await db.collection('borderrouters').findOne({ _id: ObjectID(_id)})
        } catch (error) {
            console.log(error)
        }

        return borderRouter
    },
    createMonthPayment: async (root, { input }) => {
        let db
        let MonthPayment

        const defaultValues = {
            payments: {
                month: {
                    ene: N,
                    feb: N,
                    mar: N,
                    abr: N,
                    may: N,
                    jun: N,
                    jul: N,
                    ago: N,
                    sep: N,
                    oct: N,
                    nov: N,
                    dec: N
                }
            }
        }

        const newMonthPayment = Object.assign(defaultValues, input)

        try {

            db = await connectDb()
            MonthPayment = await db.collection('monthpayments').insertOne(newMonthPayment)
            newMonthPayment._id = MonthPayment.insertedId            

        } catch(e) {
            console.log(e)
        }

        return newMonthPayment
    },
    editMonthPayment: async (root, { _id, input }) => {
        let db
        let MonthPayment

        try {
            db = await connectDb()
            MonthPayment = await db.collection('monthpayments').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            
            MonthPayment = await db.collection('monthpayments').findOne({ _id: ObjectID(_id)})

        } catch (e) {
            console.log(e)
        }
        return MonthPayment
    },
    createAboDed: async (root, { input }) => {
        let db
        let Aboded

        const newAboded = input

        try {

            db = await connectDb()
            Aboded = await db.collection('abodeds').insertOne(newAboded)
            newAboded._id = Aboded.insertedId            

        } catch(e) {
            console.log(e)
        }

        return newAboded
    },
    editAboDed: async (root, { _id, input }) => {
        let db
        let aboDed

        try {
            db = await connectDb()
            aboDed = await db.collection('abodeds').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            
            aboDed = await db.collection('abodeds').findOne({ _id: ObjectID(_id)})

        } catch (e) {
            console.log(e)
        }
        return aboDed
    },
    createWandL: async (root, { input }) => {
        let db
        let WandL

        const newWandL = input

        try {

            db = await connectDb()
            WandL = await db.collection('wandls').insertOne(newWandL)
            newWandL._id = WandL.insertedId            

        } catch(e) {
            console.log(e)
        }

        return newWandL
    },
    editWandL: async (root, { _id, input }) => {
        let db
        let WandL

        try {
            db = await connectDb()
            WandL = await db.collection('wandls').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            
            WandL = await db.collection('wandls').findOne({ _id: ObjectID(_id)})

        } catch (e) {
            console.log(e)
        }
        return WandL
    },
    createFinancialState: async (root, { input }) => {
        let db
        let financialState
        let newFinancialState

        try {
            db = await connectDb()
            financialState = await db.collection('financialstate').find().toArray()

            if (financialState == []) {
                newFinancialState = input
                
                financialState = await db.collection('financialState').insertOne(newFinancialState)

                newFinancialState._id = financialState.insertedId
            } else {
                return financialState;
            }

        } catch (e) {
            console.error(e)
        }

        return newFinancialState
    },
    editFinancialState: async (root, { _id, input }) => {
        let db
        let financialState

        try {
            db = await connectDb()
            financialState = await db.collection('financialstates').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            
            financialState = await db.collection('financialstates').findOne({ _id: ObjectID(_id)})

        } catch (e) {
            console.log(e)
        }
        return financialState
    },
    createTag: async (root, { input }) => {
        let db
        let tag

        const newTag = input

        try {

            db = await connectDb()
            tag = await db.collection('tags').insertOne(newTag)
            newTag._id = tag.insertedId            

        } catch(e) {
            console.log(e)
        }

        return newTag
    },
    editTag: async (root, { id, input }) => {
        let db
        let tag

        try {
            db = await connectDb()
            tag = await db.collection('tags').updateOne(
                {_id: ObjectID(_id)},
                {$set: input}
            )
            
            tag = await db.collection('tags').findOne({ _id: ObjectID(_id)})

        } catch (e) {
            console.log(e)
        }
        return tag
    }
}