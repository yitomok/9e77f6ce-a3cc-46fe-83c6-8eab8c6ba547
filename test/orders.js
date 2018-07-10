const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../app')

chai.use(chaiHttp)

const mongoUtils = require('../utils/mongo-utils')

const Order = require('../models/order')

describe('Orders', () => {
    let dummyOrder = new Order({
        orderId: '001',
        name: 'Peter Lustig',
        address: 'Steindamm 80',
        item: 'Macbook',
        price: 1700,
        currency: 'EUR'
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

    describe('/POST /orders', () => {
        it('should create a new order', (done) => {
            chai.request(server)
            .post('/orders')
            .send(dummyOrder)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('_id')
                _id = res.body._id
                done()
            })
        })
    })

    describe('/PUT /orders/:id', () => {
        let orderId = '001'
        let price = 1600

        it('should update an existing order', (done) => {
            chai.request(server)
            .put('/orders/' + orderId)
            .send(Object.assign({}, dummyOrder, { 'price': price }))
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('_id', _id)
                res.body.should.be.an('object').with.property('price', price)
                done()
            })
        })
    })

    describe('/POST /orders/query/:type', () => {
        it('should retrieve orders by type "name"', (done) => {
            chai.request(server)
            .post('/orders/query/name')
            .send({ by: 'Peter Lustig' })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array').that.is.not.empty
                done()
            })
        })

        it('should retrieve orders by type "address"', (done) => {
            chai.request(server)
            .post('/orders/query/address')
            .send({ by: 'Steindamm 80' })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array').that.is.not.empty
                done()
            })
        })
    })

    describe('/GET /orders/count', () => {
        it('should retrieve order count grouped by items', (done) => {
            chai.request(server)
            .get('/orders/count')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array').that.is.not.empty
                done()
            })
        })
    })

    describe('/DELETE /orders/:id', () => {
        let orderId = '001'

        it('should delete an order by an identifier', (done) => {
            chai.request(server)
            .delete('/orders/' + orderId)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('_id', _id)
                res.body.should.be.an('object').with.property('orderId', orderId)
                done()
            })
        })
    })
})
