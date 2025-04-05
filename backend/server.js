import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Add `.js`
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// app config

const app = express();
const PORT = process.env.PORT || 4000;

//api end points
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// middle wares

// db connection
connectDB();

app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(PORT, () => {
  console.log(`The port is running http://localhost:${PORT}`);
});

// email banol33255@bnsteps.com
// password abcabcabcabc
// cluster-username banol33255
// cluster-password newwelthypassword
// the url code mongodb+srv://banol33255:newwelthypassword@cluster0.w3qrw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
