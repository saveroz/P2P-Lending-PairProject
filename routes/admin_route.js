const express = require("express");
const router = express.Router();

const admin_controller = require("../controllers/admin/admin_controller");
const coffeeshop_controller = require("../controllers/admin/coffeeshop_controller");
const coffee_controller = require("../controllers/admin/coffee_controller");
const voucher_controller = require("../controllers/admin/voucher_controller");


router.get("/", admin_controller.dashboard);
router.get("/login", admin_controller.login_get);
router.post("/login", admin_controller.login_post);
router.get("/logout", admin_controller.logout_get);

router.get("/coffeeshop/:coffeeShopId", check_is_logged_id, coffeeshop_controller.detail_coffee_shop_get);

router.post("/coffeeshop/:coffeeShopId", check_is_logged_id, coffeeshop_controller.add_menu_post);

router.get("/coffee/", check_is_logged_id, coffee_controller.list_all_coffee_get);

router.get("/coffee/add", check_is_logged_id, coffee_controller.add_coffee_get);
router.post("/coffee/add", check_is_logged_id, coffee_controller.add_coffee_post);

router.get("/coffee/edit/:coffeeId", check_is_logged_id, coffee_controller.edit_coffee_get);
router.post("/coffee/edit/:coffeeId", check_is_logged_id, coffee_controller.edit_coffee_post);

router.get("/voucher/", check_is_logged_id, voucher_controller.list_of_all_voucher_get);

router.get("/voucher/add", check_is_logged_id, voucher_controller.add_voucher_get);
router.post("/voucher/add", check_is_logged_id, voucher_controller.add_voucher_post);

router.get("/voucher/delete/:voucherId", check_is_logged_id, voucher_controller.delete_voucher_get);


function check_is_logged_id(req, res, next){
    if(req.session.userId && req.session.role == "admin"){
        next();
    }else{
        res.redirect("/admin/login");
    }
}

module.exports = router;