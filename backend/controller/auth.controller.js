import User from "../models/user.models.js";
import { generateVerificationCode } from "../util/generateVerificationCode.js";
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from "../util/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/email.js";
import { WelcomeEmail } from "../mailtrap/email.js";
import { z } from "zod";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { sendPasswordResetMail } from "../mailtrap/email.js";
import { sendResetSuccessMail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const requiredFields = { email, password, name };

  
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `${missingFields.join(", ")} are required` });
    }

    const [existingUserByEmail, existingUserByUsername] = await Promise.all([
      User.findOne({ email }).exec(),
      User.findOne({ name }).exec(),
    ]);

    if (existingUserByEmail || existingUserByUsername) {
      const messages = [];

      if (existingUserByEmail) messages.push('Email already in use');
      if (existingUserByUsername) messages.push('Username already taken');

      return res.status(400).json({
        success: false,
        message: messages.join(' '),
      });
    }
   
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationCode();
    console.log(verificationToken);
    
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationtoken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);
  
    
    sendVerificationEmail(user.email,verificationToken)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...user._doc,
        password: undefined, 
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyEmail = async(req,res)=>{
    const {code} = req.body;
    console.log(code);
    
    try{
      const allUsers = await User.find({});
        console.log("All users in database:", allUsers);

     
        const user = await User.findOne({
             verificationtoken: code ,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        console.log("Found user:", user);
      

      if(!user){
        return res.status(400).json({
          success:false,
          message:"Invalid or Expired Code"
        })
      }

      user.isVerified = true;
      user.verificationtoken = undefined;
      user.verificationTokenExpiresAt = undefined;

      await user.save()

      await WelcomeEmail(user.email,user.name);

      return res.status(200).json({
        success:true,
        message:'Email Verified Successfully',
        user:{
          ...user._doc,
          password:undefined
        }
      })
    } 
    catch(e){
      console.log(e);
      
    }
}

export const logout = (req,res)=>{
  res.clearCookie('token');
  res.status(200).json({
    success:true,
    message:"Logged out Successfully"
  })
}

export const checkLoginStatus=async(req,res,next)=>{
  try {
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({
        success:false,
        message:"Not Authenticated"
      })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if(!user){
      return res.status(404).json({
        success:false,
        message:'User Not Found'
      })
    }

    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const timeSinceLastLogin = Date.now() - new Date(user.lastlogin).getTime();

    if(timeSinceLastLogin > sevenDays){
      res.clearCookie('token');
      return res.status(401).json({
        success:false,
        message:"Session Expired , Autmatically Logged Out"
      })
    }
    next();


  } catch (error) {
    console.log(error);
    
  }
} 

const PasswordSchema= z.string().min(8).max(15);

const EmailSchema = z.string().email();

const userSchema = z.string().min(3).max(25)

const loginSchema = z.object({
  identifier:z.string().min(3).max(35),
  password:PasswordSchema
})


export const login = async(req,res)=>{
      const {identifier,password} = req.body
   try {

      const RequiredFields = {identifier,password};

      const missingFields = Object.entries(RequiredFields).filter(([key,value])=>!value).map(([key])=>key);

      if(missingFields.length > 0){
        return res.status(400).json({
            message:`${missingFields.join(' ')} are required`
        })
      }

      const ValidData = loginSchema.safeParse(req.body)
      console.log("Parsed Data",ValidData.data);

      if(!ValidData.success){
        return res.status(400).json({ 
          success:false,
          message:'Enter Correct Inputs',
          errors: ValidData.error.errors,
        })
      }
      
      const {identifier:validIdentifier,password:validPassword } = ValidData.data;

      const isEmail = /\S+@\S+\.\S+/.test(validIdentifier);
      
    let user;

    try{
      if(isEmail){
        const validEmail = EmailSchema.parse(validIdentifier);
        user = await User.findOne({email:validEmail.toLowerCase()}).exec()
      }else{
        const validUsername = userSchema.parse(validIdentifier);
        user = await User.findOne({name:validUsername}).exec()
      }
    }catch(e){
        console.log(e);
        
    }

    if(!user){
      return res.status(400).json({
        success:false,
        message:'Invali Username/email or password'
      })
    }

    const isPassword = await bcryptjs.compare(password,user.password);
    if(!isPassword){
      return res.status(400).json({
        success:false,
        message:'Invalid password'
      })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:'7d'
    })

    res.cookie('token',token,{httpOnly:true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000});

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
   
   } catch (error) {
    console.log(error);
    
   }
}

export const forgotPasword = async(req,res)=>{
  const {email} = req.body;
  try {
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        success:false,
        message:'User Not Found'
      })
    }

    const resetPasswordToken = crypto.randomBytes(32).toString('hex');

    const resetPasswordExpireAt = 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpireAt = resetPasswordExpireAt;

    await user.save()

    await sendPasswordResetMail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

    res.status(200).json({
      success:true,
      message:'Password Reset Email sent'
    })
  } catch (error) {
    console.log(error);
    
  }
}

export const resetPassword = async(req,res)=>{
  try {
    const {token} = req.params;
    console.log(token);
    
    const {password} = req.body;

    const user =await User.findOne({
      resetPasswordToken:token,
      resetPasswordExpireAt:  { $gt: Date.now() }
    })

    if(!user){
      return res.status(400).json({
        success:false,
        message:'Invalid or Toekn Expired'
    })
    }

    const hashedPassword = await bcryptjs.hash(password,10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpireAt = undefined;

    await user.save();

    await sendResetSuccessMail(user.email);

    return res.status(200).json({
      success:true,
      message:'Password Updated Successfully'
    })
  } catch (error) {
    console.log(error);
    
  }
}
