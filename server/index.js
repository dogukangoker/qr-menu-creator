import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routes/userRouter.js";
import productRouter from "./Routes/productRouter.js";
import categoryRouter from "./Routes/categoryRouter.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 5000, () => {
  mongoose
    .connect(process.env.DB_STRING)
    .then(() => console.log("Veritabanı bağlantısı başarılı."))
    .catch((err) => console.log(err));
});
