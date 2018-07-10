const Order = require('../models/order')
const ordersApi = require('../api/orders-api')

const router = module.exports = require('express').Router()

router.post('/query/:type', (req, res) => {
    if ((req.params.type == 'name' || req.params.type == 'address') && req.body.by) {
        let conditions = {}
        conditions[req.params.type] = req.body.by

        ordersApi.getOrders(conditions)
        .then((orders) => {
            res.json(orders)
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
        ordersApi.createOrder(new Order(req.body))
        .then((result) => ordersApi.getOrder(result.insertedId))
        .then((order) => {
            res.json(order)
        })
    } catch(error) {
        res.status(500).json({ 'message': 'error' })
    }
})

router.put('/:id', (req, res) => {
    try {
        ordersApi.updateOrder(req.params.id, new Order(req.body))
        .then((result) => {
            res.json(result.value)
        })
    } catch(error) {
        res.status(500).json({ 'message': 'error' })
    }
})

router.delete('/:id', (req, res) => {
    ordersApi.deleteOrder(req.params.id)
    .then((result) => {
        res.json(result.value)
    })
    .catch((error) => {
        res.status(500).json({ 'message': 'error' })
    })
})

router.get('/count', (req, res) => {
    ordersApi.getOrdersCount()
    .then((orders) => {
        res.json(orders)
    })
    .catch((error) => {
        res.status(500).json({ 'message': 'error' })
    })
})
