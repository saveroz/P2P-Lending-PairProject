const express = require("express");
const router = express.Router();

const admin_controller = require("../controllers/admin_controller");

router.get("/",admin_controller.homepage);
router.get("/registerCampaign",admin_controller.registerCampaign_get);
router.post("/",admin_controller.registerCampaign_post);
router.get("/delete/:id",admin_controller.deleteCampaign);
router.get("/edit/:id",admin_controller.editCampaign_get);
router.post("/edit/:id",admin_controller.editCampaign_post);
// router.get("/fund",admin_controller.fund_get);
router.get("/listPeminjam/:id",admin_controller.listPeminjam_get);

// function check_is_logged_id(req, res, next){
//     if(req.session.userId && req.session.role == "admin"){
//         next();
//     }else{
//         res.redirect("/admin/login");
//     }
// }

module.exports = router;
