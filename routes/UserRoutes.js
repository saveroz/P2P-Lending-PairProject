const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/UserController')
const middleware = require('../helper/middleware')


Router.get('/', middleware ,UserController.Homepage)

Router.get('/edit', middleware,UserController.EditGet)

Router.post('/edit', middleware,UserController.EditPost)

Router.get('/topup', middleware,UserController.TopUpGet)

Router.post('/topup', middleware, UserController.TopUpPost)

Router.get('/delete', middleware,UserController.delete)

Router.get('/givemoney', middleware,UserController.GiveMoneyGet)

Router.post('/givemoney', middleware,UserController.GiveMoneyPost)

Router.get('/listofborrower',middleware, UserController.ListofBorrower)


Router.get('/logout', middleware,UserController.Logout)
// Router.post('/login', function (req, ress) {

//     res.send(req.body)
// })

module.exports = Router