import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    lastlogin:{type:Date,default:Date.now()},
    isVerified:{type:Boolean,default:false},
    resetPasswordToken:String,
    resetPasswordExpireAt:Date,
    verificationtoken:String,
    verificationTokenExpiresAt:Date
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User