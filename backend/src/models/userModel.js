import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    name:{
        type:String,
        required:true
    },
    profilePic:
    {
        type:String,
        default:"/avatar.png"
    },
    bio:{
        type:String,
        default:function(){
            return `Hello, I'm ${this.name}`
        }
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    },
    phone:{
        type:String,
        default:""
    },
    address:{
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        zip: { type: String, default: "" },
        country: { type: String, default: "" },
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
},{timestamps:true});

export const User=mongoose.model('User',userSchema);