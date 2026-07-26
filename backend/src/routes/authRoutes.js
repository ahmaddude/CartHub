import express from 'express';
import {becomeASeller, checkAuth, forgotPassword, login, logout, resetPassword, signup,updateProfile,verifyEmail} from '../controllers/authController.js'//auth
import { verifyToken } from '../middleware/verifyToken.js';
import {createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory} from '../controllers/categoryController.js';//category
import { createProduct, deleteproduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';//product
import { addToCart, clearCart, removeFromCart, updateCart, veiwCart } from '../controllers/cartController.js';//cart
import { createOrder, getOrders } from '../controllers/orderController.js';//order
import { createPayment } from '../controllers/stripeController.js';//stripe


//start of auth routes
const router=express.Router();

router.post("/signup",signup);

router.post("/verify-email",verifyEmail);

router.post("/login",login);

router.post("/logout",logout);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password/:token",resetPassword);

router.get("/check-auth",verifyToken,checkAuth);

router.put("/update-profile",verifyToken,updateProfile);

router.post("/become-seller",verifyToken,becomeASeller);

//end of auth routes
//------------------------------------------------------------

//start of category routes
router.get("/categories",getAllCategories);

router.post("/create-category",verifyToken,createCategory);

router.get("/get-category/:id",getCategoryById);

router.put("/update-category/:id",verifyToken,updateCategory);

router.delete("/delete-category/:id",verifyToken,deleteCategory)

//end of category routes
//-------------------------------------------------------------
//start of product routes
router.get("/products",getAllProducts);

router.get("/product/:id",getProductById);

router.post("/create-product",verifyToken,createProduct);

router.put("/update-product/:id",verifyToken,updateProduct);

router.delete("/delete-product/:id",verifyToken,deleteproduct);
//end of product routes
//-------------------------------------------------------------
//start of cart routes

router.get("/view-cart",verifyToken,veiwCart);

router.post("/add-to-cart",verifyToken,addToCart);

router.put("/update-cart/:productID",verifyToken,updateCart);

router.delete("/delete-item/:productID",verifyToken,removeFromCart);

router.delete("/clear-cart",verifyToken,clearCart)

//end to cart routes
//-------------------------------------------------------------
//start of order routes

router.post("/create-order",verifyToken,createOrder);

router.get("/orders",verifyToken,getOrders);

//end of order routes
//-------------------------------------------------------------
//start of payment routes
router.post('/create-payment',verifyToken,createPayment)

export default router;
