const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/UserController')
const { User, UserToBorrower, Borrower } = require('../models/index')


Router.get('/', function (req, res) {
    res.send('hello world')
})

Router.get('/:id/edit', UserController.EditGet)

Router.post('/:id/edit', UserController.EditPost)

Router.get('/:id/topup', UserController.TopUpGet)

Router.post('/:id/topup', UserController.TopUpPost)

Router.get('/:id/delete', UserController.delete)

Router.get('/:id/givemoney', UserController.GiveMoneyGet)

Router.post('/:id/givemoney', UserController.GiveMoneyPost)

Router.get('/:id/listofborrower', UserController.ListofBorrower)

Router.get('/login', function (req, res) {
    res.render('./user/pages/login.ejs')
})

Router.post('/login', function (req, ress) {

    res.send(req.body)
})

module.exports = Router