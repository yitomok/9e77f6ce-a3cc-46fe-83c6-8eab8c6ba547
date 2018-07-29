'use strict'

const Joi = require('joi')

const schema = Joi.object({
    customerId: Joi.string().required(),
    name: Joi.string().min(1).max(100).required(),
    address: Joi.string().min(1).max(1000).required()
})

class Customer {
    constructor(customer) {
        schema.validate(customer, (error, value) => {
            if (error) {
                throw error
            } else {
                this.customerId = value.customerId
                this.name = value.name
                this.address = value.address
            }
        })
    }
}

module.exports = Customer
