'use strict'

const Joi = require('joi')

const schema = Joi.object({
    orderId: Joi.string().required(),
    name: Joi.string().min(1).max(100).required(),
    address: Joi.string().min(1).max(1000).required(),
    item: Joi.string().min(1).max(100).required(),
    price: Joi.number().positive().integer().required(),
    currency: Joi.string().length(3).required()
})

class Order {
    constructor(order) {
        schema.validate(order, (error, value) => {
            if (error) {
                throw error
            } else {
                this.orderId = value.orderId
                this.name = value.name
                this.address = value.address
                this.item = value.item
                this.price = value.price
                this.currency = value.currency
            }
        })
    }
}

module.exports = Order
