const express = require('express')
const Router = express.Router()
// const UserController = require('../controllers/UserController')
const { User } = require('../models/index')


Router.get('/', function (req, res){
    res.render("login")
})

Router.post('/', function (req, res){
    // Response.se("login")
    res.send(req.body)
})

module.exports = Router