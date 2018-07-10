module.exports = {
    'app': {
        'env': process.env.NODE_ENV
    },
    'mongodb': {
        'uri': process.env.DB_URI || 'mongodb://localhost:27017/backend-bg',
        'ordersCollection' : process.env.ORDERS_COLLECTION || 'orders'
    },
    'network': {
        'port': Number(process.env.PORT)
    }
}
