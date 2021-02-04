const console = require('console');
const express = require('express');

//importar variables de entorno
const {
    PORT
} = require('./config')

const app = express(express)
const port =  PORT || 4050

app.use('/', (req, res) => {
    res.send('hola diego voce eri gei?')
    console.log(req)
})

app.listen(port, () => {
    console.log(`aplicacion corriendo en el puerto ${port}`)
})