const express=require("express");
const router=express.Router();
const mongoose=require('mongoose');
const ejs=require("ejs");
const Book=require("../models/book");
const User=require("../models/user");
// const multer=require('multer');
// const{storage}=require('../cloudinary/index');
// const upload=multer({storage});

const book=require('../controllers/book');
const e = require("express");
// let name="math",photo="https://images.unsplash.com/photo-1509228468518-180dd4864904?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",desc="heloo",contact="1234567890";
// let book=new Book({name:name,photo:photo,desc:desc,contact:contact});
// book.save();
// console.log(book);

router.get('/books',(req,res)=>{
    Book.find({},(err,books)=>{
        if(err){
            console.log(err);
        }else{
            res.render('books',{books:books})
        }
    })
})

router.get('/book/new',(req,res)=>{
    res.render('new');
})

router.post('/books',(req,res)=>{
  const book=new Book({name:req.body.name,
    photo:req.body.photo,
    desc:req.body.desc,
    contact:req.body.contact})

    Book.create(book,(err,book)=>{
        if(err){
            res.redirect('/books/new');
        }else{
            res.redirect('/books')
        }
    })



})
router.post('/book/:bookid/delete',(req,res)=>{
    const id=req.params.bookid;
    const _id=mongoose.Types.ObjectId.createFromHexString(req.params.bookid);
    Book.findByIdAndDelete({_id},(err,book)=>{
        if(err){
            res.send("book not deleted")
        }else{
            res.redirect('/books');
        }
    })
})

router.get('/book/show/:bookid',(req,res)=>{
   const id=req.params.bookid;

    const _id=mongoose.Types.ObjectId.createFromHexString(req.params.bookid);
    const book=Book.findById({_id},(err,book)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.render('show',{book:book});
        }
    });
  
})

module.exports=router;
