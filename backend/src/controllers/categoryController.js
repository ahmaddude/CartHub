import {Category} from '../models/categoryModel.js';
import mongoose from 'mongoose';
export const getAllCategories=async(req,res)=>{
    try {
        const categories=await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
};

export const createCategory=async(req,res)=>{
    const{name,description}=req.body;
    if(!name)return  res.status(400).json({ success: false, message: "Please provide category name" });
    try {
        const category=new Category({
            name,
            description,
        });
        await category.save();
        res.status(201).json({
            success:true,
            message:"Category created successfully",
            category,
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
        });
    }
};

export const getCategoryById=async(req,res)=>{
    const{id}=req.params;
    try {
        const category=await Category.findById(id);

        if(!category){
            return res.status(404).json({
                success:false,
                message:"Category not found",
            });
           
        }
        res.status(200).json({
            success:true,
            category,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

export const updateCategory=async(req,res)=>{
    const{id}=req.params;
    const{name,description}=req.body;
    if(!name&&!description) return res.status(400).json({ success: false, message: "Nothing Updated" });
    try {
        const updatedCategory=await Category.findByIdAndUpdate(id,{name,description},{new:true});
        
        res.status(200).json({
            success:true,
            message:"Category updated successfully",
            updatedCategory,
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
        });
    }
};

export const deleteCategory=async(req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid Category Id" });
        }
        try {
            await Category.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: "Category deleted" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
}