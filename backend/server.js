import express from 'express'
import { connectDb } from './connectDb.js';
import authRoute from "./route/auth.route.js"

const app = express();
app.use(express.json())
const port = process.env.PORT || 5000
app.use('/api/v1/',authRoute)


app.listen(port,()=>{
    connectDb();
    console.log(`server is running on ${port}`);
})
