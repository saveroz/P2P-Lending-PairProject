const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/UserController')
const { User, UserToBorrower, Borrower } = require('../models/index')
const middleware = require('../helper/middleware')


Router.get('/', middleware ,function (req, res) {

    res.render('./user/pages/user')
})

Router.get('/edit', middleware,UserController.EditGet)

Router.post('/edit', middleware,UserController.EditPost)

Router.get('/topup', middleware,UserController.TopUpGet)

Router.post('/topup', middleware, UserController.TopUpPost)

Router.get('/delete', middleware,UserController.delete)

Router.get('/givemoney', middleware,UserController.GiveMoneyGet)

Router.post('/givemoney', middleware,UserController.GiveMoneyPost)

Router.get('/listofborrower',middleware, UserController.ListofBorrower)

// Router.get('/login', function (req, res) {
//     res.render('./user/pages/login.ejs')
// })


Router.get('/logout', middleware,function (req, res) {
    
    req.session.destroy( err =>{
        if (err){
            res.send(err.message)
        }
        else{
            console.log(req.session)
            res.redirect('/')
        }
    })
    
    // res.render('./user/pages/login.ejs')
    
})

// Router.post('/login', function (req, ress) {

//     res.send(req.body)
// })

module.exports = Router