const express = require("express");
const router = express.Router();

const customer_controller = require('../controller/customer_controller');
// const transaction_controller = require("../controllers/customer/transaction_controller");

router.get("/",customer_controller.homepage);
router.get("/register",customer_controller.register_get);
router.get("/login",customer_controller.login_get);
router.get("/fund",customer_controller.fund_get);
router.get("/preview",customer_controller.preview_get);


// router.get("/", customer_controller.homepage);

// router.get("/register", is_logged_in, customer_controller.register_customer_get);
// router.post("/register", customer_controller.register_customer_post);

// router.get("/login", is_logged_in, customer_controller.login_customer_get);
// router.post("/login", customer_controller.login_customer_post);

// router.get("/logout", customer_controller.logout_customer_get);

// router.get("/coffeeshop", transaction_controller.list_all_coffeeshop);

// router.get("/coffeeshop/:coffeeShopId", transaction_controller.list_all_menu);

// router.post("/order/:coffeeShopId", transaction_controller.order_review_post);
// router.get("/order", transaction_controller.order_review_get);


// function is_logged_in(req, res, next){
//     if(req.session.userId){
//         res.redirect("/")
//     }else{
//         next();
//     }
// }


module.exports = router;