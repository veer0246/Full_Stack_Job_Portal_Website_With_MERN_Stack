import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:['student', 'recruiter'], // choose you are a student or recruiter
        require:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, // it is relate user to company
        profilePhoto:{type:String, default:""}
    }

},{timestamps:true})

export const User = mongoose.model('User', userSchema)