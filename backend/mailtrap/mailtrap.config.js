import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()


console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);

export const transporter = nodemailer.createTransport({
  service:'gmail',
  secure:true,
  port:465,
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  }
})
