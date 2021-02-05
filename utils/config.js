require('dotenv').config()

module.exports = {
    PORT: process.env.PLUGNET_PORT,
    DB_NAME: process.env.DB_NAME
}
