import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userModel',
        required: true
    }],
    title:{
        type:String,
        required:true,
        trim: true,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['Pending', 'Inprogress', 'Completed','Started'],
        default:'Inprogress'
    },
    tag:{
        type:String,
        enum:['Urgent','Normal','Less Important'],
        default:'Normal'
    }
},{timestamps:true})

const todoModel = mongoose.models.todo || mongoose.model('todo',todoSchema);

export default todoModel;