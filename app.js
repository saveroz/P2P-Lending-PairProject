const express = require('express')
const app = express()
const port = 3000
const {User, UserToBorrower, Borrower} = require('./models/index')
const UserRouter = require('./routes/UserRoutes')
const AdminRouter = require('./routes/admin_route')
const LoginRouter = require('./routes/login_route')
const registerRouter = require('./routes/register_routes')
const session = require('express-session')

// app.use(session(
//     {
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))
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


// app.use('/admin',AdminRouter)
// app.use('/user',UserRouter)
// app.get('/login', function(req,res){
//     res.render('login')
// })
// app.post('/login', function (req, res) {

//     res.send(req.body)
// })

app.listen(port)





