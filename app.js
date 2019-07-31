const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
// const session = require("express-session");

const router = require("./routes");

app.set('view engine', 'ejs');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.locals.frontHelper = require("./helpers/front_helper");
// app.locals.login = null;

//SESSION
// app.use(session({
//     secret: 'bukansecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { expires: 600000 }
// }));

//INIT ROUTER
app.use("/", router);
// app.use(express.static('public'));


//LISTENING
app.listen(port, () => console.log(`Example app listening on port ${port}!`))