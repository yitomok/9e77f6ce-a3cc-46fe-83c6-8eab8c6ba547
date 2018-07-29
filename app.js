const debug = require('debug')('backend-bg')
const express = require('express')
const bodyParser = require('body-parser')

const app = module.exports = express()
const config = app.locals.config = require('./config/config')
if (config.app.env != 'test') {
    app.use(require('morgan')('common'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('helmet')())

const http = require('http').Server(app)

const mongoUtils = require('./utils/mongo-utils')

if (config.app.env != 'test') {
    mongoUtils.connectDb()
    .then((client) => {
        if (client.isConnected()) {
            http.listen(config.network.port, () => {
                debug('The magic happens on port %d', config.network.port)
            })
        }
    })
    .catch((error) => {
        debug('%o', error)
    })
}

app.use('/orders', require('./routes/order.js'))
app.use('/customers', require('./routes/customer.js'))
app.use((req, res) => {
    res.json({ 'message': 'welcome' })
})
