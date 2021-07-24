const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { makeExecutableSchema } = require('graphql-tools')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const cors = require('cors')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const imageNameFormater = require('./utils/imageNameFormater')
const auth = require('./services/authService')
const cookieParser = require('cookie-parser')

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
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// la siguiente funcion maneja la utenticacion de la cookie para los usuarios
app.use((req, res, next) => {
    const token = req.cookies
    next()
})


app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}))

//declaramos las rutas

// las siguientes rutas son de testteo para funcionalidades
app.post('/login', (req, res) => {
    
    const { user, password } = req.body 

    const token = auth.loginService(user, password)
    console.log(token)

    res.json({
        "message": "the token haas been send",
        token
    })
})

app.post('/verify', (req, res) => {
    const token = req.body.token
    const verifyToken = auth.authService(token)

    res.send(JSON.stringify({
        result: verifyToken
    }))
})
//aqui terminan las rutas de testeo

app.get('/', (req, res) => { 
    res.json({message: "hola"})
})

app.post('/upload',  function async (req, res) {
    const { filename } = req.query
    const relativePath = checkAndMakeDir(filename)

    try {

        if(!req.files) {
            res.send({status: false, message: 'no file uploaded'})
        }

        var image = req.files.file
        //esta funcion recibe dos parametros uno "id del usuario al que pertenece" y 
        //el nombre del archivo enviado para extraer la extension del mismo
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
