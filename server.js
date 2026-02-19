import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import commentRoute from "./routes/commentRoute.js"; 
import postRoute from "./routes/postRoutes.js";  
import authRoute from "./routes/authRoute.js";
import passwordRoute from "./routes/passwordRoute.js"; 
import mediaCommentRoute from "./routes/mediaCommentRoutes.js";

dotenv.config();

const app = express();

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'http://localhost:3000',
  process.env.FRONTEND_URL // Production frontend URL from Vercel
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now, can restrict later
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "API is running...",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/posts", postRoute);
app.use("/comments", commentRoute);
app.use("/auth", authRoute);
app.use("/password", passwordRoute);
app.use("/media-comments", mediaCommentRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// MongoDB connection with production settings
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Retry connection after 5 seconds
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

// Start server
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});