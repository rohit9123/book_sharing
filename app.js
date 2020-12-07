require("dotenv").config();
const express=require("express");
var app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const methodOverride=require("method-override");
const ejs=require("ejs");
const path=require('path');
const session=require("express-session");
const jwt=require("jsonwebtoken");
const expressJwt=require("express-jwt");

const passport=require('passport');
const LocalStrategy=require('passport-local');
const Book=require('./models/book');
const User = require("./models/user");
const userroutes=require("./routes/users");
const bookroutes=require('./routes/book');
let lof=false;





mongoose.connect("mongodb://localhost:27017/book__exchange",
{useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then(()=>console.log("database connected"));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('home');
})

const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true
   
}


app.use(userroutes);
app.use(bookroutes);
app.use(session(sessionConfig));
app.use(userroutes);



const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('app is running');
})
