import {Cart} from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const veiwCart=async(req,res)=>{
    try {
        const cart=await Cart.findOne({user:req.userId}).populate('items.product');
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        return res.status(200).json({success:true,cart});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
};

export const addToCart=async(req,res)=>{
    const userId=req.userId;
    const {productId,quantity=1}=req.body;
    const parsedQ=parseInt(quantity);
    if (isNaN(parsedQ) || parsedQ < 1) {
        return res.status(400).json({ success: false, message: 'Invalid quantity' });
      }
    try {
        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"});
        };
        let cart=await Cart.findOne({user:userId});
        if(!cart){
            cart=await Cart.create({user:userId,items:[{product:productId,quantity:parsedQ}]}); }
            else{
                const itemExists=cart.items.find(item=>item.product.toString()===productId);
                if(itemExists)
                    {
                    itemExists.quantity+=parsedQ;
                }
                else{
                    cart.items.push({product:productId,quantity:parsedQ});
                }
            }
        await cart.save();
        return res.status(200).json({success:true,message:"Product added to cart",cart});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
};

export const updateCart=async(req,res)=>{
    const userId=req.userId;
    const {productID}=req.params;
    const {quantity}=req.body;
    if(!quantity || quantity<=0){
        return res.status(400).json({success:false,message:"Quantity must be greater than 0"});
    };
    try {
        const cart=await Cart.findOne({user:userId});
        if(!cart){
            return res.status(404).json({success:false,message:"Cart not found"});
        };

        const item=cart.items.find(item => item.product.toString()===productID);
        if(!item){
            return res.status(404).json({success:false,message:"Item not found in cart"});
        };
        item.quantity=quantity;
        await cart.save();
        return res.status(200).json({success:true,message:"Cart updated successfully",cart});

    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
};

export const removeFromCart=async(req,res)=>{

    const userId=req.userId;
    const {productID}=req.params;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const updatedItems= cart.items.filter(item=>item.product.toString()!==productID)
        if(updatedItems.length===cart.items.length){
            return res.status(404).json({success:false,message:"Item not found in cart"});
        };
        cart.items=updatedItems;
        await cart.save();
        return res.status(200).json({success:true,message:"Item removed from cart",cart});

    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }


};

export const clearCart=async(req,res)=>{
    const userId=req.userId;
    try {
        const cart=await Cart.findOne({user:userId});
        if(!cart){
            return res.status(404).json({success:false,message:"Cart not found"});
        };
        cart.items=[];
        await cart.save();
        return res.status(200).json({success:true,message:"Cart cleared successfully",cart});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}