const { mongodb } = require('../config/config')
const mongoUtil = require('../utils/mongo-utils')

const getOrdersCollection = (orders=mongodb.ordersCollection) => mongoUtil.getDb().collection(orders)

const getOrders = (conditions) => getOrdersCollection().find(conditions).toArray()

const getOrder = (_id) => getOrdersCollection().findOne({ _id })
const createOrder = (order) => getOrdersCollection().insertOne(order)
const updateOrder = (orderId, order) => getOrdersCollection().findOneAndUpdate({ orderId }, { $set: order }, { returnOriginal: false })
const deleteOrder = (orderId) => getOrdersCollection().findOneAndDelete({ orderId })

const getOrdersCount = () => getOrdersCollection().aggregate([{
    '$group': { '_id': '$item', 'n': { '$sum': 1 } },
}, {
    '$sort': { 'n': -1, '_id': 1 }
}, {
    '$project': { '_id': 0, 'item': '$_id', 'n': 1 }
}]).toArray()

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersCount
}
