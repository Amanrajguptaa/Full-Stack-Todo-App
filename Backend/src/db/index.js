import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/todo`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED",error);
        process.exit(1);
    }
}

export default connectDB;