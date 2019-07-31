const express = require('express')
const Router = express.Router()
const {User, UserToBorrower, Borrower} = require('../models/index')


Router.get('/',function(req,res){
    res.send('hello world')
})

Router.get('/register', (req, res) => {
    res.render('./user/pages/register.ejs')
})

Router.post('/register', function(req,res){

    let newuser = req.body
    User.create(newuser).then((success)=>{
        res.send("success")
    }).catch(err=>{
        res.send(err.message)
    })

})

Router.get('/edit', function(req,res){
    res.render('')


})


Router.get ('/login', function(req,res){
    res.render('./user/pages/login.ejs')
})

Router.post ('/login', function(req,ress){

    res.redirect('/')
})

module.exports = Router