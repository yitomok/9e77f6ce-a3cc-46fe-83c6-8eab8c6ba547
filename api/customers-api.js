const { mongodb } = require('../config/config')
const mongoUtil = require('../utils/mongo-utils')

const ordersApi = require('./orders-api')

const getCustomersCollection = (customers=mongodb.customersCollection) => mongoUtil.getDb().collection(customers)

const getCustomers = (conditions) => getCustomersCollection().find(conditions).toArray()

const getCustomerById = (customerId) => getCustomersCollection().findOne({ customerId })
const getCustomer = (_id) => getCustomersCollection().findOne({ _id })
const createCustomer = (customer) => getCustomersCollection().insertOne(customer)
const updateCustomer = (customerId, customer) => getCustomersCollection().findOneAndUpdate({ customerId }, { $set: customer })
    .then((originalCustomer) => ordersApi.updateOrders({
        name: originalCustomer.name,
        address: originalCustomer.address
    }, customer))
    .then((result) => getCustomerById(customerId))
const deleteCustomer = (customerId) => getCustomersCollection().findOneAndDelete({ customerId })

const getCustomerOrders = (customerId) => getCustomerById(customerId)
    .then((customer) => ordersApi.getOrders({
        name: customer.name,
        address: customer.address
    }))

const getCustomerSpent = (customerId) => getCustomerById(customerId)
    .then((customer) => ordersApi.getOrdersSpent({
        name: customer.name,
        address: customer.address
    }))

const getCustomersByItem = (item) => ordersApi.getCustomersByItem(item)
    .then((result) => result.length ? getCustomers({ '$or': result[0].customers }) : [])

module.exports = {
    getCustomers,
    getCustomerById,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerOrders,
    getCustomerSpent,
    getCustomersByItem
}
