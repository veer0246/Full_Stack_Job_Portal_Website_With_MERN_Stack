import mongoose  from "mongoose";

//create connection to database--------
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected successfully');
    }catch(error){
        console.log('mongodb connection error')
    }
} 

export default connectDB;