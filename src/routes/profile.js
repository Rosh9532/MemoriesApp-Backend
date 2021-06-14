const express=require("express");
const { profile } = require("../controllers/profile");
const { requireSignin } = require("../middleware");
const router=express.Router()

router.post('/profile',requireSignin,profile)

module.exports=router