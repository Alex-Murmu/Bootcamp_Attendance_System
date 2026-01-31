import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is start");
        } catch (error) {
       console.log(error.message||"database error");
       process.exit(1);    
    }
}
