const { mongodb } = require('../config/config')
const mongoUtil = require('../utils/mongo-utils')

const getOrdersCollection = (orders=mongodb.ordersCollection) => mongoUtil.getDb().collection(orders)

const getOrders = (conditions) => getOrdersCollection().find(conditions).toArray()

const getOrder = (_id) => getOrdersCollection().findOne({ _id })
const createOrder = (order) => getOrdersCollection().insertOne(order)
const updateOrder = (orderId, order) => getOrdersCollection().findOneAndUpdate({ orderId }, { $set: order }, { returnOriginal: false })
const updateOrders = (conditions, customer) => getOrdersCollection().updateMany(conditions, { $set: customer })
const deleteOrder = (orderId) => getOrdersCollection().findOneAndDelete({ orderId })

const getOrdersCount = () => getOrdersCollection().aggregate([{
    '$group': { '_id': '$item', 'n': { '$sum': 1 } },
}, {
    '$sort': { 'n': -1, '_id': 1 }
}, {
    '$project': { '_id': 0, 'item': '$_id', 'n': 1 }
}]).toArray()

const getOrdersSpent = (conditions) => getOrdersCollection().aggregate([{
    '$match': conditions
}, {
    '$group': { '_id': '$currency', 'amount': { '$sum': '$price' } }
}, {
    '$project': { '_id': 0, 'currency': '$_id', 'amount': 1 }
}]).toArray()

const getCustomersByItem = (item) => getOrdersCollection().aggregate([{
    '$match': { 'item': item }
}, {
    '$group': { '_id': '$item', 'customers': { '$addToSet': { 'name': '$name', 'address': '$address' } } }
}]).toArray()

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    updateOrders,
    deleteOrder,
    getOrdersCount,
    getOrdersSpent,
    getCustomersByItem
}
