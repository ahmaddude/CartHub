import {Product}from "../models/productModel.js";
import {User}from "../models/userModel.js"
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
    try {
        const products =await Product.find().populate("categoryID");
        res.json({
            success: true,
            message: "Products fetched successfully",
            products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
        
    }
};

export const getProductById = async (req, res) => {
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid product ID",
        });
    }
    try {
        const product =await Product.findById(id).populate("categoryID");
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch product",
            error:error.message,
        });
    }
};

export const createProduct=async(req,res)=>{
    const {name,description,price,image,stock,categoryID}=req.body;
    if(!name||!price||!image||!stock||!categoryID){
        return res.status(400).json({
            success:false,
            message:"Please fill all fields",
        });
        
    }
    try {
        const user=await User.findById(req.userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        if(user.role!=="seller"){
            return res.status(400).json({
            success:false,
            message:"un authorized, become a seller first",
        });
        }
        const product=await Product.create({
            name,
            description,
            price,
            image,
            stock,
            categoryID,
            sellerID:req.userId
        });
        res.status(201).json({
            success:true,
            message:"Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to create product",
            error:error.message,
        });
    }
};

export const updateProduct=async(req,res)=>{
    const{id}=req.params;
    const{name,price,description,image,stock,categoryID}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid Product Id"})
    }
    try {
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"});
        }
        if(product.sellerID.toString()!==req.userId){
            return res.status(403).json({success:false,message:"Not authorized to update this product"});
        }
        const updatedProduct=await Product.findByIdAndUpdate(id,{name,price,description,image,stock,categoryID},{new:true});
        res.status(200).json({success:true,message:"Product updated successfully",updatedProduct});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to update product",
            error:error.message,
        });
    }
};

export const deleteproduct=async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid Product Id"})
    }
    try {
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"});
        }
        if(product.sellerID.toString()!==req.userId){
            return res.status(403).json({success:false,message:"Not authorized to delete this product"});
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to delete product",
            error:error.message,
        });
    }
}