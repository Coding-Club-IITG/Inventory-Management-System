const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    name: String,
    mobileNumber: Number,
    club: {
        type:String,
        unique: true,
    },
    userID: {
        type:String,
        unique: true,
    },
    password: String,
    superUser: Boolean
});
module.exports=mongoose.model("User",userSchema);
