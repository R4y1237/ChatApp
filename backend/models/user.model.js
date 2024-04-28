import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    profilePic:{
        type:String,
        default: "",
    },
});

const User  = mongoose.model("User", userModel);

export default User;