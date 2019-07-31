const express = require('express')
const app = express()
const port = 3000
const {User, UserToBorrower, Borrower} = require('./models/index')
const UserRouter = require('./routes/UserRoutes')
const AdminRouter = require('./routes/admin_route')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false})) 

app.get ('/',function(req, res){
    res.send('Hello World')
})

app.use('/admin',AdminRouter)
app.use('/user',UserRouter)

app.listen(port)





