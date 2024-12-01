import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image:{
        type:String,
        default:""
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'todoModel',
    }],
},{timestamps:true})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;