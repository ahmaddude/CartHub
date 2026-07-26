import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    items:[
    {product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    }}
],
    totalAmount:{
        type:Number,
        required:true,
        
    },
    status:{
        type:String,
        required:true,
        enum:["Pending","Shipped","Delivered","Cancelled"],
        default:"Pending"
    },

},{timestamps:true});

export const Order=mongoose.model("Order",orderSchema);