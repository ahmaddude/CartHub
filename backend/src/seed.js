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
  { name: "Alice Johnson", email: "alice@test.com", role: "seller", phone: "+1-555-0101", address: { street: "123 Fashion Ave", city: "New York", state: "NY", zip: "10001", country: "US" }, bio: "Premium seller with top products" },
  { name: "Bob Smith", email: "bob@test.com", role: "seller", phone: "+1-555-0102", address: { street: "456 Style Blvd", city: "Los Angeles", state: "CA", zip: "90001", country: "US" }, bio: "Quality apparel and accessories" },
  { name: "Grace Hopper", email: "grace@test.com", role: "seller", phone: "+1-555-0103", address: { street: "789 Craft Ln", city: "Austin", state: "TX", zip: "73301", country: "US" }, bio: "Handmade clothing & accessories" },
  { name: "Charlie Brown", email: "charlie@test.com", role: "buyer", bio: "Avid shopper looking for deals" },
  { name: "Diana Ross", email: "diana@test.com", role: "buyer", bio: "Fashion and beauty enthusiast" },
  { name: "Eve Adams", email: "eve@test.com", role: "buyer", bio: "Always hunting for discounts" },
  { name: "Frank Castle", email: "frank@test.com", role: "buyer", bio: "Tech and fitness nerd" },
];

const CATEGORIES = [
  { name: "Tops", description: "T-shirts, sweaters, and button-ups", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { name: "Outerwear", description: "Jackets, coats, and vests", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { name: "Bottoms", description: "Jeans, trousers, shorts, and leggings", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400" },
  { name: "Footwear", description: "Sneakers, boots, and shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { name: "Dresses & Formal", description: "Dresses, blazers, and occasion wear", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
];

const PRODUCTS = [
  { name: "Classic Cotton T-Shirt", description: "100% organic cotton crew neck tee, pre-shrunk", price: 24.99, stock: 200, category: "Tops", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { name: "Cashmere Sweater", description: "Soft cashmere crew neck sweater", price: 99.99, stock: 30, category: "Tops", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400" },
  { name: "Silk Button-Up Shirt", description: "Lightweight silk button-up, relaxed fit", price: 69.99, stock: 30, category: "Tops", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
  { name: "Graphic Crewneck Sweatshirt", description: "Cotton-blend crewneck with printed graphic", price: 39.99, stock: 65, category: "Tops", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400" },
  { name: "Oversized Hoodie", description: "Heavyweight fleece hoodie with kangaroo pocket", price: 44.99, stock: 70, category: "Tops", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },

  { name: "Leather Biker Jacket", description: "Genuine leather biker jacket with quilted lining", price: 149.99, stock: 20, category: "Outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { name: "Wool Blend Overcoat", description: "Tailored wool-blend overcoat for cold weather", price: 189.99, stock: 15, category: "Outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400" },
  { name: "Puffer Vest", description: "Packable puffer vest with recycled down fill", price: 74.99, stock: 40, category: "Outerwear", image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=400" },

  { name: "Slim-Fit Denim Jeans", description: "Slim-fit denim jeans with stretch comfort", price: 59.99, stock: 60, category: "Bottoms", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400" },
  { name: "Cargo Shorts", description: "Relaxed-fit cargo shorts with multiple pockets", price: 39.99, stock: 55, category: "Bottoms", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
  { name: "High-Waisted Leggings", description: "Squat-proof high-waisted leggings with side pockets", price: 34.99, stock: 90, category: "Bottoms", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400" },
  { name: "Linen Trousers", description: "Breathable linen trousers with drawstring waist", price: 49.99, stock: 45, category: "Bottoms", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400" },

  { name: "Running Sneakers", description: "Lightweight running shoes with responsive cushioning", price: 89.99, stock: 40, category: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { name: "Chelsea Boots", description: "Suede Chelsea boots with elastic side panels", price: 119.99, stock: 25, category: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },

  { name: "Floral Summer Dress", description: "Lightweight floral midi dress, breathable fabric", price: 54.99, stock: 35, category: "Dresses & Formal", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
  { name: "Tailored Blazer", description: "Structured single-breasted blazer for work or nights out", price: 129.99, stock: 20, category: "Dresses & Formal", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400" },
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

    const buyers = createdUsers.filter(u => u.role === "buyer");
    const orderItems = [
      { productIdx: 0, qty: 2, status: "Delivered", daysAgo: 120 },
      { productIdx: 1, qty: 1, status: "Delivered", daysAgo: 90 },
      { productIdx: 4, qty: 3, status: "Delivered", daysAgo: 60 },
      { productIdx: 5, qty: 1, status: "Shipped", daysAgo: 30 },
      { productIdx: 6, qty: 2, status: "Delivered", daysAgo: 45 },
      { productIdx: 8, qty: 1, status: "Delivered", daysAgo: 20 },
      { productIdx: 10, qty: 2, status: "Pending", daysAgo: 2 },
      { productIdx: 13, qty: 1, status: "Shipped", daysAgo: 10 },
      { productIdx: 14, qty: 1, status: "Delivered", daysAgo: 75 },
      { productIdx: 15, qty: 2, status: "Cancelled", daysAgo: 5 },
      { productIdx: 2, qty: 1, status: "Delivered", daysAgo: 150 },
      { productIdx: 7, qty: 1, status: "Pending", daysAgo: 1 },
      { productIdx: 11, qty: 2, status: "Shipped", daysAgo: 15 },
      { productIdx: 3, qty: 1, status: "Delivered", daysAgo: 110 },
      { productIdx: 9, qty: 3, status: "Delivered", daysAgo: 40 },
    ];

    const orders = orderItems.map((item) => {
      const product = createdProducts[item.productIdx];
      const buyer = buyers[Math.floor(Math.random() * buyers.length)];
      const date = new Date();
      date.setDate(date.getDate() - item.daysAgo);
      const total = product.price * item.qty;
      return {
        user: buyer._id,
        items: [{ product: product._id, quantity: item.qty }],
        totalAmount: total,
        status: item.status,
        createdAt: date,
        updatedAt: date,
      };
    });

    await Order.insertMany(orders);
    console.log(`Created ${orders.length} orders`);

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