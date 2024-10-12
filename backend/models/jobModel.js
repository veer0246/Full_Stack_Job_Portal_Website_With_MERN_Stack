import mongoose  from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{  // requirement for the job skills it store in array
        type:String
    }],
    salary:{
        type:Number,
        required:true
    },
    experienceLavel:{
     type:Number,
     required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{ // 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{ // user which is create this form
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true 
    },
    application:[{  //application which is apply by the student
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]

},{timestamps:true})

export const Job = mongoose.model("Job", jobSchema)