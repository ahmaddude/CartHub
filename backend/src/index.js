import express from 'express';
import { connectdb } from './db/connect.js';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import cloudinary from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
const __dirname = path.resolve();
const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// CORS configuration for development and production
app.use(cors(
  { 
     origin:"http://localhost:5173",
    credentials:true,
  }
    
))


// API routes
app.use("/api/auth", router);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "frontend", "dist");
  
  // Check if build files exist
  if (fs.existsSync(staticPath)) {
    app.use(express.static(staticPath));
    
    // Serve React app for all non-API routes
    app.get(/^(?!\/api).*/, (req, res) => {
      const indexPath = path.join(staticPath, "index.html");
      
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Frontend build files not found");
      }
    });
  } else {
    // Fallback if build directory doesn't exist
    app.get("*", (req, res) => {
      res.status(500).json({
        error: "Frontend not built",
        message: "Please run the build process"
      });
    });
  }
} else {
  // Development mode - simple API status
  app.get("/", (req, res) => {
    res.json({ message: "API is running in development mode" });
  });
}

app.listen(Port, () => {
  connectdb();
  console.log(`Server is running on port ${Port}`);
});