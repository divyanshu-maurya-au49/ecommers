import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongoDB');
    } catch (error) {
        console.log(`Error ${error} `);
    }
}

export default connectDB;