'use strict'

const { mongodb } = require('../config/config')
const { MongoClient } = require('mongodb')

let _client

const connectDb = (uri=mongodb.uri) => MongoClient.connect(uri, {
    useNewUrlParser: true
})
.then((client) => {
    _client = client
    return _client
})
.catch((error) => {
    _client = undefined
    return _client
})

const disconnectDb = () => _client.close()

const getDb = () => _client.db()

module.exports = {
    connectDb,
    disconnectDb,
    getDb
}
