const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const LoginRouter = require('./routes/login_route')
const registerRouter = require('./routes/register_routes')
const session = require('express-session')


app.use(session({
    key: 'cookie',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false})) 

app.get ('/',function(req, res){
    // res.send('Hello World')
    res.render('home.ejs')
    
})

app.use ('/login', LoginRouter)

app.use('/register',registerRouter)


app.listen(port)





