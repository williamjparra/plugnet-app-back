const console = require('console');
const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { makeExecutableSchema } = require('graphql-tools')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const cors = require('Cors')

//importar variables de entorno
const {
    PORT
} = require('./utils/config')

const app = express(express)
const port =  PORT || 4050

//declaramos las rutas
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')

const schema = makeExecutableSchema({ typeDefs, resolvers })

//declaramos los middlewares

app.use(cors())

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.use('/', (req, res) => {
    res.send('hola como estas esta es la ruta raiz')
})

app.listen(port, () => {
    console.log(`aplicacion corriendo en el puerto ${port}`)
})
