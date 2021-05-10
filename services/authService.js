const jwt = require('jsonwebtoken')

const secret = 'hola este es el secret'

const loginService = ({ user, password }) => {

    const payload = {
        user,
        password
    }

    var token = jwt.sign(payload, secret, { expiresIn: '15s'})

    return token
}

const authService = (token) => {
    try {
        const decode = jwt.verify(token, secret)
        return decode
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports = {
    loginService,
    authService
}