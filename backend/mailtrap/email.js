
import { transporter } from "../mailtrap/mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_TEMPLATE, WELCOME_TEMPLATE } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    console.log(recipient);
    
    
    try {
        const mailOptions ={
            from:process.env.EMAIL_USER,
            to:recipient[0].email,
            subject:"Verify Your Email",
            html: VERIFICATION_TEMPLATE.replace("{{verification_code}}", verificationToken)
        }
       
        const res = transporter.sendMail(mailOptions);
        
        console.log("Email sent successfully",res); 
        
    } catch (error) {
        console.error("Error sending email", error);
        throw new Error('Error sending an email'); 
    }
};

export const WelcomeEmail=async(email,name)=>{
    const recipient=[{email}];

    try {
       const mailOptions = {
        from:process.env.EMAIL_USER,
        to:recipient[0].email,
        subject:"Welcome Email",
        html:WELCOME_TEMPLATE.replace( "{user_name}",recipient.name)
       }

       const res = transporter.sendMail(mailOptions);
       console.log("Welcome Mail Sent",res);
       
        
    } catch (error) {
        console.log(error);
        
    }
}

export const sendPasswordResetMail = async(email,resetUrl)=>{
    const recipent = [{email}];

    try {
        const mailOptions = {
            from:process.env.EMAIL_USER,
            to:recipent[0].email,
            subject:"Forgot Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE
        }
        
       const res = transporter.sendMail(mailOptions);
       console.log("Change Password Email sent",res); 
    } catch (error) {
        console.log(error);
        
    }
}

export const sendResetSuccessMail = async(email)=>{
    const recipent = [{email}];

    try {
        const mailOptions = {
            from:process.env.EMAIL_USER,
            to:recipent[0].email,
            subject:"Forgot Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE
        }
        const res = transporter.sendMail(mailOptions);
        console.log("Password Reset Successfully",res); 
    } catch (error) {
        console.log(error);
        
    }
}