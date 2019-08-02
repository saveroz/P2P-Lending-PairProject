const express = require('express')
const app = express()
const Router = express.Router()
const UserRoutes = require('./UserRoutes')
const AdminRoutes  =require('./admin_route')
const session = require('express-session');
const LoginController = require('../controllers/loginController')


Router.get('/', function (req, res){
    res.render("login")
})

Router.post('/', LoginController.AuthLogin)

Router.use('/user',UserRoutes)
Router.use('/admin',AdminRoutes)

module.exports = Router