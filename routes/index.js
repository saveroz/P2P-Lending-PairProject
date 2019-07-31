const express = require("express");
const router = express.Router();

// const admin_route = require("./admin_route");
const customer_route = require("./customer_route");


// router.use("/admin", admin_route);

router.use("/", customer_route);



// var sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }    
// };


module.exports = router;