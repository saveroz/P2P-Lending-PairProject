const express = require('express')
const app = express()
const Router = express.Router()
const {generatePass, checkPassword} = require('../helper/encryptpass')
const UserRoutes = require('./UserRoutes')
const session = require('express-session');
const { User } = require('../models/index')
const middleware = require('../helper/middleware')


Router.get('/', function (req, res){
    res.render("login")
})


Router.post('/', function (req, res){

    let data = req.body
    // res.send(data)
    User.findOne({
        where : {
            email : data.email
        }
    }).then((User) =>{
        let pass = data.password
        if (checkPassword(pass,User.password)){

            if (User.role === 'user'){
                req.session.currentUser = {
                    'email' : User.email,
                    'password' : User.password,
                    'id' : User.id
                }
                // console.log(req.sessionCurrentUser)
                res.redirect('/login/user')
                
            }
            else{
                res.redirect('/login/admin')
            }
            
        }
        else{
            // res.redirect('/Home')
            res.send('login gagal')
        }

    }).catch(err=>{
        res.send(err.message)
    })
    
})

Router.use('/user',UserRoutes)

// Router.use()


module.exports = Router