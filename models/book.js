const mongoose=require("mongoose");
const express=require("express");
let User=require("./user");
const { stringify } = require("uuid");

const { ObjectId } = mongoose.Schema;
const BookSchema= new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:50,
        required:true
    },
    photo:{type:String,
    require:true} ,
    desc:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('Book',BookSchema);
