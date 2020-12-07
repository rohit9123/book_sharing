const express = require('express');
const router = express.Router();
const ejs=require("ejs");
const expressJwt=require("express-jwt");
const jwt=require("jsonwebtoken");
const session=require("express-session");


const passport = require('passport');
// const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
// const users = require('../controllers/users');



router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post("/signup",function(req,res){
    let email=req.body.email;
    let name=req.body.name;
    let  lastname=req.body.lastname;
    let password=req.body.password;
    
 
User.create({name:name,
  lastname:lastname,
  email:email,
  password:password
      },function(err,user){
          if(err){
              console.log(err);
              res.redirect("/signin");
          }else{
                   res.redirect("/");
          }
      })


})

router.get('/signin',(req,res)=>{
    res.render("signin.ejs");
})


router.post('/signin',(req,res)=>{
   let email=req.body.email;
   let password=req.body.password;
   User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (!user.authenticate(password)) {

        console.log("not");
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }
    const token = jwt.sign({ _id: user._id }, 'secert');
 
    res.cookie("token", token, { expire: new Date() + 9999 });
    

    
    // const { _id, name, email, role } = user;
    
    console.log(req.user);
    
    console.log(user);
    console.log("user loggedin");
    res.redirect("/");

})
console.log("not enterd");
})

router.get('/signout',(req,res)=>{
    if(user_id){
    lof=false;
    res.redirect('/');}
    else{
        res.redirect('/signin');
    }
})

module.exports=router;

