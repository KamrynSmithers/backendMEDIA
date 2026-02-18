import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import commentRoute from "./routes/commentRoute.js"; 
import postRoute from "./routes/postRoutes.js";  
import authRoute from "./routes/authRoute.js"
import passwordRoute from "./routes/passwordRoute.js"; 
import mediaCommentRoute from "./routes/mediaCommentRoutes.js"
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

if (email === 'test@test.com' && password === 'password') {
    res.json({ success: true, token: 'your-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/posts", postRoute);  


app.use("/comments", commentRoute);
app.use("/auth", authRoute);
app.use("/password", passwordRoute);
app.use("/media-comments", mediaCommentRoute)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
