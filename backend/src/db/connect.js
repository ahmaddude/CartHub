import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectdb =async()=>{
    try {
        if(!process.env.MONGO_URI){
            console.log("MONGO_URI is not defined!")
            process.exit(1)
        }
        const conn=  await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected:${conn.connection.host}` )
    } catch (error) {
        console.log("Error in connection to MongoDB", error.message)
        process.exit(1)
    }
}