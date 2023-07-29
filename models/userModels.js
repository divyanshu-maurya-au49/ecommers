import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true,
       trim:true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid please provide correct')
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:{},
        required:true
    },
    answer:{
        type:String,
    },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export default mongoose.model('users', userSchema)