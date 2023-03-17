const express = require('express');
const app= express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) 
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
// const cookieParser = require("cookie-parser");
const User = require('./models/userSchema');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(cookieParser);
const mongoose = require("mongoose");
const URI = 
`mongodb+srv://cc-rim-portal:yFKI00xcm00W4qPT@cluster0.ipm9jh9.mongodb.net/?retryWrites=true&w=majority` ;
app.use(bodyParser.json());
mongoose
	.connect(URI)
	.then((result) => {
		console.log("connected");
		app.listen(4000);
	})
	.catch((err) => {
		console.log(err);
	});

app.post('/register', async (req, res)=>{
    const userID= req.body.userID;
    const password= req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name: req.body.name, club: req.body.club, userID: req.body.userID, mobileNumber: req.body.mobileNumber, password: hashedPassword});
    try{
        user.save();
        res.status(201).send(user);
    }
    catch(err){
        res.send(err);
    }
})

app.post('/login', async (req, res)=>{
    console.log("Login API called");
    const userID = req.body.userID;
    const user = await User.findOne({userID: userID});
    const user1 = user?{userID: user.userID, club: user.club}:null;
    if(user==null){
        console.log("User not found")
        return res.status(400).json({result: "Invalid"});
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            console.log("Successfully logged in");
        } else{
            console.log("Wrong pw");
            return res.status(400).json({result: "Invalid"});
        }
    }
    catch(err){
        
        console.log("error");
        return res.status(500).send(err);
    }
    const accessToken = jwt.sign(user1, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
    // res.cookie('jwt', accessToken, {httpOnly: true});

    res.status(200).json({jwt:accessToken, result:"Success", user: user._id});
});

app.get('logout', (req, res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/login');
})
app.get('checkToken',(req, res)=>{
    const token= req.body.jwt;
    if(token == null) return res.redirect('/login');
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(400).send(err);
        req.user = user;
        req.status(200).send({user: user});
        });
    }
});
// app.listen(4000);