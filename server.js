import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import commentRoute from "./routes/commentRoute.js"; // <-- ADD THIS LINE
import postRoute from "./routes/postRoutes.js";  // add this with your other imports

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/posts", postRoute);  // add this with your other routes


app.use("/comments", commentRoute);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
