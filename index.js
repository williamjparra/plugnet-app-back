const console = require('console');
const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { makeExecutableSchema } = require('graphql-tools')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const cors = require('Cors')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const imageNameFormater = require('./utils/imageNameFormater')

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
app.use(fileUpload({
    uriDecodeFileNames: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())

app.use(express.static('assets'))

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send('hola como estas esta es la ruta raiz')
})

app.post('/upload',  function async (req, res) {
    const { filename } = req.query
    const relativePath = checkAndMakeDir(filename)

    try {

        if(!req.files) {
            res.send({status: false, message: 'no file uploaded'})
        }

        var image = req.files.file
        const imageName = imageNameFormater(filename, image.name)
        const savePath = `.${relativePath}/${imageName}`

        image.mv(savePath)

        res.send({
            status: true,
            message: 'file uploaded',
            data: {
                name: imageName,
                mimetype: image.mimetype,
                size: image.size
            },
            srcPath: savePath            
        })

    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log(`aplicacion corriendo en el puerto ${port}`)
})


const checkAndMakeDir = (directory) => {
    const checkDir = fs.existsSync(`assets/${directory}`)

    if(checkDir === false) {
        fs.mkdir(`${__dirname}/assets/${directory}`, { recursive: true }, err => console.log(err))
        return `/assets/${directory}`
    }
    
    return `/assets/${directory}`
}
