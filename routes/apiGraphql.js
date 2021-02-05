const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { makeExecutableSchema } = require('graphql-tools')
const { join } = require('path')
const resolvers = require('../lib/resolvers')

function apiGraph(app) {

    const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    app.use('/api', graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    }))
}

module.export = apiGraph