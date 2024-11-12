const express= require("express");
const { handleHomePage } = require("../controllers/home");

const router= express.Router();

router.get("/",handleHomePage);
router.get("/signup",async(req,res)=>{
    return res.render("signup");
});
router.get("/login",async(req,res)=>{
    return res.render("login");
});

module.exports=router;