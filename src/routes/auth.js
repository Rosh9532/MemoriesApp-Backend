const express=require("express");
const passport=require('passport');
const User = require("../models/user");
const jwt=require("jsonwebtoken");
const { signup, login, signout } = require("../controllers/sign");
const { requireSignin } = require("../middleware");


const router=express.Router();


//auth with google
router.get('/google',passport.authenticate('google',{scope:['profile']}))

router.get('/google/callback',passport.authenticate('google',{
    session:false
}),(req,res)=>{
   
    console.log(req.user)
    const token=jwt.sign({_id:req.user._id,},process.env.SECRET_KEY,{expiresIn:'1d'});
    const displayName=req.user.displayName
    console.log(token)
    console.log(displayName)
    return res.status(200).json({
        token,
        displayName
    })
})


//Signup with username and passowrd
router.post('/signup',signup);
router.post('/login',login);
router.post('/signout',requireSignin ,signout);



module.exports=router