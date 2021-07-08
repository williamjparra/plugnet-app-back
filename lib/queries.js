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
    getClient: async (root, { _id }) => {
        let db
        let client

        try {

            db = await connectDb()
            client = await db.collection('clients').findOne({ _id: ObjectId(_id) })

        } catch (err) {
            console.log(err)
        }

        return client
    },
    getContracts: async () => {
        let db
        let contracts = []

        try {

            db = await connectDb()
            contracts = await db.collection('contracts').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return contracts
    },
    getContract: async (root, { id }) => {
        let db
        let contract

        try {

            db = await connectDb()
            contract = await db.collection('contracts').findOne({ _id: ObjectId(id) })

        } catch (err) {
            console.log(err)
        }

        return contract
    },
    getContractRef: async (root, { refId }) => {
        let db
        let contract

        try {

            db = await connectDb()
            contract = await db.collection('contracts').findOne({ refId: refId, })

        } catch (err) {
            console.log(err)
        }

        return contract
    },
    getAllSectors: async () => {
        let db
        let sectors
        let sectorsWithClients = []

        try {
            
            db = await connectDb()
            sectors = await db.collection('sectors').find().toArray()
            sectors.map(async sector => {
                var sectorClients = {
                    ...sector,
                    contracts: []
                }
                let client
                try {
                    client = await db.collection('contracts').find({ sector: `${sector._id}` })
                    sectorClients.contracts.push(client)                    
                } catch (err) {
                    console.log(err)
                }
                sectorsWithClients.push(sectorClients)
            })

        } catch (err) {
            console.log(err)
        }

        return sectorsWithClients
    },
    getSector: async (root, { _id }) => {
        let db
        let sector 

        try {

            db = await connectDb()
            sector = await db.collection('sectors').findOne({
                _id: objectId(_id)
            })

        } catch (err) {
            console.log(err)
        }

        return sector
    },
    getBorderRouters: async () => {
        let db
        let borderRouters

        try {
            
            db = await connectDb()
            borderRouters = await db.collection('borderrouters').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return borderRouters
    },
    getBorderRouter: async (root, { _id }) => {
        let db
        let borderRouter

        try {
            
            db = await connectDb()
            borderRouter = await db.collection('borderrouters').findOne({
                _id: objectId(_id)
            })

        } catch (err) {
            console.log(err)
        }

        return borderRouter
    },
    getMonthPayments: async () => {
        let db
        let monthpayments = []

        try {

            db = await connectDb()
            monthpayments = await db.collection('monthpayments').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return monthpayments
    },
    getMonthPayment: async (root, { refId }) => {
        let db
        let monthpayment

        try {

            db = await connectDb()
            monthpayment = await db.collection('monthpayments').findOne({ refId: refId, })

        } catch (err) {
            console.log(err)
        }

        return monthpayment
    },
    getAboDeds: async () => {
        let db
        let abodeds = []

        try {

            db = await connectDb()
            abodeds = await db.collection('abodeds').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return abodeds
    },
    getAboDed: async (root, { refId }) => {
        let db
        let aboded

        try {

            db = await connectDb()
            aboded = await db.collection('abodeds').findOne({ refId: refId, })

        } catch (err) {
            console.log(err)
        }

        return aboded
    },
    getWandLs: async () => {
        let db
        let wandls = []

        try {

            db = await connectDb()
            wandls = await db.collection('wandls').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return wandls
    },
    getWandL: async (root, { _id }) => {
        let db
        let wandl

        try {

            db = await connectDb()
            wandl = await db.collection('wandls').findOne({ _id: ObjectId(_id) })

        } catch (err) {
            console.log(err)
        }

        return wandl
    },
    getFinancialState: async () => {
        let db
        let financialstate = []

        try {

            db = await connectDb()
            financialstate = await db.collection('financialstate').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return financialstate
    },
    getTags: async () => {
        let db
        let tags = []

        try {

            db = await connectDb()
            tags = await db.collection('tags').find().toArray()

        } catch (err) {
            console.log(err)
        }

        return tags
    },
    getTag: async (root, { _id }) => {
        let db
        let tag

        try {

            db = await connectDb()
            tag = await db.collection('tags').findOne({_id: objectId(_id)})

        } catch(err) {
            console.log(err)
        }

        return tag
    }
}