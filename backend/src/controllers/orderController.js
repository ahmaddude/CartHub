import { Order } from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const createOrder=async(req,res)=>{
    const userId=req.userId;
    try {
        const cart=await Cart.findOne({user:userId}).populate("items.product");

        if(!cart||cart.items.length===0){
            const recent = await Order.findOne({user:userId}).sort({createdAt:-1});
            if(recent){
                const elapsed = Date.now() - new Date(recent.createdAt).getTime();
                if(elapsed < 30000){
                    return res.status(200).json({success:true,message:"Order already placed", order:recent});
                }
            }
            return res.status(400).json({message:"Cart is empty"});
        }

        let totalAmount=0;
        cart.items.forEach(item=>{
            totalAmount+=item.product.price*item.quantity;
        });

        const order=new Order({
            user:userId,
            items:cart.items.map(item=>({
                product:item.product._id,
                quantity:item.quantity,
            })),
            totalAmount,
        });
        await order.save();
        await Cart.findOneAndUpdate({user:userId},{items:[]});

        return res.status(201).json({success:true,message:"Order created successfully", order})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
};

export const getOrders=async(req,res)=>{
    const userId=req.userId;
    try {
        const orders=await Order.find({user:userId}).populate('items.product');
        if(!orders||orders.length===0){
            return res.status(404).json({success:false,message:"No orders found"});
        };
        return res.status(200).json({success:true,orders});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}