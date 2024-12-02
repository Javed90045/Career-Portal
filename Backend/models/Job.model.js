import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String
    }],
    salary:{
        type: String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type: Number,
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    created_By:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }

},{timestamps:true});

export const Job = mongoose.model('Job',JobSchema);