import mongoose from 'mongoose'
import dotenv from 'dotenv'
export const connectDb = async()=>{

    dotenv.config();
    try {
        console.log(process.env.MONGO_URL);
        
        const res = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected ${res.connection.host}`);
        
    } catch (error) {
        console.log(`Error Connecting to mongoDB`,error);
        process.exit(1)  //1 is failure and 0 is success
    }
}