
const express=require("express");
const mongoose=require("mongoose");
const Book=require("./book");
const crypto =require("crypto");
const { ObjectId } = mongoose.Schema;
const { v1: uuidv1 } = require('uuid');
uuidv1(); 
const Schema = mongoose.Schema;
let userSchema=new Schema({

    
    name:{
        
        type:String,
        required:true,
        minlength:3,
        maxlength:32,
        trim:true
    },
    lastname:{
      
        type:String,
        required:true,
        minlength:3,
        maxlength:32,
        trim:true
    },     email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    encry_password:{
      type:String,
      
    },
    hash:String,
    salt:String,
    usenrname:{
      type:String,
      require:true
    }

    
  
   
});

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {

    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)=== this.encry_password;
    },

    securePassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
          return crypto
            .createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
        } catch (err) {
          return "";
        }
      }
    };
const User=mongoose.model('User',userSchema);
module.exports=User;
