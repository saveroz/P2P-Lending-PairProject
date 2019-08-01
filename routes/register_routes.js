const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/UserController')
const { User, UserToBorrower, Borrower } = require('../models/index')


Router.get('/', (req, res) => {
    res.render('./user/pages/register.ejs')
})

Router.post('/', UserController.create)

module.exports = Router