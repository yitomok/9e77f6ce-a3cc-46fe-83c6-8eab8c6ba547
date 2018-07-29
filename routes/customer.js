const Customer = require('../models/customer')
const customersApi = require('../api/customers-api')

const router = module.exports = require('express').Router()


router.get('/:id/orders', (req, res) => {
    customersApi.getCustomerOrders(req.params.id)
    .then((customerOrders) => {
        res.json(customerOrders)
    })
    .catch((error) => {
        res.status(500).json({ 'message': 'error' })
    })
})

router.get('/:id/spent', (req, res) => {
    customersApi.getCustomerSpent(req.params.id)
    .then((spent) => {
        res.json(spent)
    })
    .catch((error) => {
        res.status(500).json({ 'message': 'error' })
    })
})

router.get('/orders', (req, res) => {
    if (req.query.item) {
        customersApi.getCustomersByItem(req.query.item)
        .then((customers) => {
            res.json(customers)
        })
        .catch((error) => {
            res.status(500).json({ 'message': 'error' })
        })
    } else {
        res.status(400).json({ 'message': 'invalid' })
    }
})

router.post('/', (req, res) => {
    try {
        customersApi.createCustomer(new Customer(req.body))
        .then((result) => customersApi.getCustomer(result.insertedId))
        .then((customer) => {
            res.json(customer)
        })
    } catch(error) {
        res.status(500).json({ 'message': 'error' })
    }
})

router.get('/:id', (req, res) => {
    customersApi.getCustomerById(req.params.id)
    .then((customer) => {
        res.json(customer)
    })
    .catch((error) => {
        res.status(500).json({ 'message': 'error' })
    })
})

router.put('/:id', (req, res) => {
    try {
        customersApi.updateCustomer(req.params.id, new Customer(req.body))
        .then((updatedCustomer) => {
            res.json(updatedCustomer)
        })
    } catch(error) {
        res.status(500).json({ 'message': 'error' })
    }
})

router.delete('/:id', (req, res) => {
    customersApi.deleteCustomer(req.params.id)
    .then((result) => {
        res.json(result.value)
    })
    .catch((error) => {
        res.status(500).json({ 'message': 'error' })
    })
})
