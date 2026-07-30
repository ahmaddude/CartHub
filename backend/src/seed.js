import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";
import { Category } from "./models/categoryModel.js";
import { Product } from "./models/productModel.js";
import { Cart } from "./models/cartModel.js";
import { Order } from "./models/orderModel.js";

dotenv.config();

const AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
];

const USERS = [
  { name: "Alice Johnson", email: "alice@test.com", role: "seller", bio: "Premium seller with top products" },
  { name: "Bob Smith", email: "bob@test.com", role: "seller", bio: "Quality electronics and gadgets" },
  { name: "Grace Hopper", email: "grace@test.com", role: "seller", bio: "Handmade crafts & art" },
  { name: "Charlie Brown", email: "charlie@test.com", role: "buyer", bio: "Avid shopper looking for deals" },
  { name: "Diana Ross", email: "diana@test.com", role: "buyer", bio: "Fashion and beauty enthusiast" },
  { name: "Eve Adams", email: "eve@test.com", role: "buyer", bio: "Always hunting for discounts" },
  { name: "Frank Castle", email: "frank@test.com", role: "buyer", bio: "Tech and fitness nerd" },
];

const CATEGORIES = [
  { name: "Electronics", description: "Gadgets, devices, and accessories", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400" },
  { name: "Clothing", description: "Fashion apparel and accessories", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400" },
  { name: "Home & Garden", description: "Everything for your home", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400" },
  { name: "Sports", description: "Sports equipment and gear", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" },
  { name: "Books", description: "Books and educational materials", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400" },
];

const PRODUCTS = [
  { name: "Wireless Headphones", description: "Noise-cancelling bluetooth headphones with 30hr battery life", price: 79.99, stock: 50, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { name: "Smart Watch", description: "Fitness tracker with heart rate monitor and GPS", price: 199.99, stock: 30, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { name: "USB-C Hub", description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader", price: 34.99, stock: 100, category: "Electronics", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" },
  { name: "Bluetooth Speaker", description: "Portable waterproof speaker with 360 sound", price: 49.99, stock: 40, category: "Electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
  { name: "Leather Jacket", description: "Genuine leather biker jacket with quilted lining", price: 149.99, stock: 20, category: "Clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { name: "Running Shoes", description: "Lightweight running shoes with responsive cushioning", price: 89.99, stock: 40, category: "Clothing", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { name: "Cotton T-Shirt", description: "100% organic cotton crew neck tee, pre-shrunk", price: 24.99, stock: 200, category: "Clothing", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400" },
  { name: "Denim Jeans", description: "Slim-fit denim jeans with stretch comfort", price: 59.99, stock: 60, category: "Clothing", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400" },
  { name: "Indoor Plant Pot", description: "Ceramic plant pot with drainage hole, 8-inch", price: 19.99, stock: 60, category: "Home & Garden", image: "https://images.unsplash.com/photo-1485955905806-10f45f8e7c9a?w=400" },
  { name: "Scented Candle Set", description: "Set of 3 soy wax candles - vanilla, lavender, cinnamon", price: 29.99, stock: 45, category: "Home & Garden", image: "https://images.unsplash.com/photo-1603009905000-9253eae4cef0?w=400" },
  { name: "Throw Blanket", description: "Ultra-soft fleece throw blanket, 50x60 inches", price: 34.99, stock: 35, category: "Home & Garden", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
  { name: "Yoga Mat", description: "Non-slip exercise yoga mat, 6mm thick with carrying strap", price: 25.99, stock: 80, category: "Sports", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" },
  { name: "Dumbbell Set", description: "Adjustable dumbbell set 2x10kg with foam grip", price: 59.99, stock: 25, category: "Sports", image: "https://images.unsplash.com/photo-1638536532688-1f4d5e2c7e4b?w=400" },
  { name: "Resistance Bands", description: "Set of 5 resistance bands with door anchor", price: 15.99, stock: 150, category: "Sports", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400" },
  { name: "JavaScript: The Good Parts", description: "Classic JS book by Douglas Crockford", price: 29.99, stock: 35, category: "Books", image: "https://images.unsplash.com/photo-1495440639906-3e0e0d4a9e3e?w=400" },
  { name: "Clean Code", description: "A handbook of agile software craftsmanship by Robert C. Martin", price: 39.99, stock: 40, category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
  { name: "Design Patterns", description: "Elements of Reusable Object-Oriented Software - Gang of Four", price: 44.99, stock: 20, category: "Books", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    const createdCategories = await Category.insertMany(CATEGORIES);
    console.log(`Created ${createdCategories.length} categories`);

    const categoryMap = {};
    createdCategories.forEach(cat => { categoryMap[cat.name] = cat._id; });

    const hashedPassword = await bcryptjs.hash("password123", 10);
    const createdUsers = await User.insertMany(
      USERS.map((u, i) => ({
        ...u,
        password: hashedPassword,
        isVerified: true,
        profilePic: AVATARS[i],
        lastLogin: new Date(),
      }))
    );
    console.log(`Created ${createdUsers.length} users`);

    const sellers = createdUsers.filter(u => u.role === "seller");

    const products = PRODUCTS.map(p => ({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      stock: p.stock,
      sellerID: sellers[Math.floor(Math.random() * sellers.length)]._id,
      categoryID: categoryMap[p.category],
    }));

    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    console.log("\n✅ Seed complete!");
    console.log("─── Test Accounts ───");
    console.log("All users password: password123");
    USERS.forEach(u => console.log(`  ${u.role}: ${u.email}`));

  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
