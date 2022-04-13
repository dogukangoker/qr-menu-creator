import express from "express";
import Product from "../Models/ProductModel.js";
import Logger from "../Logger.js";

const router = express.Router();

router.post("/addproduct", async (req, res) => {
  try {
    console.log(req.body);
    const {
      product_name,
      product_category,
      product_description,
      product_image,
      product_price,
    } = req.body;
    const productExists = await Product.findOne({ product_name });
    if (productExists) {
      return res.status(400).json({ message: "Ürün mevcut." });
    }
    const createdProduct = await Product.create({
      product_name,
      product_category,
      product_description,
      product_image,
      product_price,
    });
    Logger.info(`${product_name} ürünü oluşturuldu.`);
    return res.status(201).json(createdProduct);
  } catch (e) {
    Logger.error(e);
    return res.json({ message: e });
  }
});

router.get("/listproduct", async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(400).json({ message: "Ürün yok." });
    }
    Logger.info(`${products.length} adet ürün listelendi.`);
    res.status(200).json({ products, message: "Ürünler listelendi." });
  } catch (e) {
    Logger.error(e);
    res.status(400).json({ message: e.message });
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({ message: "Ürün bulunamadı." });
    }
    Logger.info(`${product.product_name} ürünü silindi.`);
    return res.status(200).json({ message: "Ürün silindi." });
  } catch (e) {
    Logger.error(e);
    return res.status(400).json({ message: "Eksik ürün id bilgisi girildi." });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_name,
      product_category,
      product_description,
      product_image,
      product_price,
    } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      product_name,
      product_category,
      product_description,
      product_image,
      product_price,
    });
    if (!product) {
      return res.status(400).json({ message: "Ürün bulunamadı." });
    }
    Logger.info(`${product.product_name} ürünü güncellendi.`);
    return res.status(200).json({ message: "Ürün güncellendi." });
  } catch (e) {
    Logger.error(e);
    return res.status(400).json({ message: "Eksik ürün id bilgisi girildi." });
  }
});

export default router;
