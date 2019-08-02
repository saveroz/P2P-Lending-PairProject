const { User } = require('../models/index')
const {generatePass, checkPassword} = require('../helper/encryptpass')

class LoginController{

    static AuthLogin(req,res){
        let data = req.body
    // res.send(data)
    User.findOne({
        where : {
            email : data.email
        }
    }).then((User) =>{
        let pass = data.password
        if (checkPassword(pass,User.password)){

            req.session.currentUser = {
                'email' : User.email,
                'password' : User.password,
                'id' : User.id
            }

            if (User.role === 'user'){

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
    }
}
module.exports = LoginController