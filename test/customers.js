const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../app')

chai.use(chaiHttp)

const mongoUtils = require('../utils/mongo-utils')

const Customer = require('../models/customer')

describe('Customers', () => {
    let dummyCustomer = new Customer({
        customerId: '001',
        name: 'Peter Lustig',
        address: 'Steindamm 80'
    })
    let _id

    before((done) => {
        mongoUtils.connectDb()
        .then((client) => done())
    })

    after((done) => {
        mongoUtils.disconnectDb()
        .then(() => done())
    })

    describe('/POST /customers', () => {
        it('should create a new customer', (done) => {
            chai.request(server)
            .post('/customers')
            .send(dummyCustomer)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('_id')
                _id = res.body._id
                done()
            })
        })
    })

    describe('/GET /customers/:id', () => {
        let customerId = '001'

        it('should get an existing customer', (done) => {
            chai.request(server)
            .get('/customers/' + customerId)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('_id', _id)
                res.body.should.be.an('object').with.property('customerId', customerId)
                done()
            })
        })
    })

    describe('/PUT /customers/:id', () => {
        let customerId = '001'
        let newAddress = 'Steindamm 79'

        it('should update an existing customer', (done) => {
            chai.request(server)
            .put('/customers/' + customerId)
            .send(Object.assign({}, dummyCustomer, { 'address': newAddress }))
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('_id', _id)
                res.body.should.be.an('object').with.property('address', newAddress)
                done()
            })
        })
    })

    describe('/GET /customers/:id/orders', () => {
        let customerId = '001'

        it('should retrieve all orders by an existing customer', (done) => {
            chai.request(server)
            .get('/customers/' + customerId + '/orders')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                done()
            })
        })
    })

    describe('/GET /customers/:id/spent', () => {
        let customerId = '001'

        it('should retrieve total spent by an existing customer', (done) => {
            chai.request(server)
            .get('/customers/' + customerId + '/spent')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                done()
            })
        })
    })

    describe('/GET /customers/orders', () => {
        let item = 'Macbook'

        it('should retrieve total spent by an existing customer', (done) => {
            chai.request(server)
            .get('/customers/orders')
            .query({ 'item': item })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                done()
            })
        })
    })

    describe('/DELETE /customers/:id', () => {
        let customerId = '001'

        it('should delete a customer by an identifier', (done) => {
            chai.request(server)
            .delete('/customers/' + customerId)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('_id', _id)
                res.body.should.be.an('object').with.property('customerId', customerId)
                done()
            })
        })
    })
})
