import express from "express";
import Product from "../Models/ProductModel.js";
import Logger from "../Logger.js";

const router = express.Router();

function createSlug(text) {
  var trMap = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  };
  for (var key in trMap) {
    text = text.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
  }
  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, "") // remove non-alphanumeric chars
    .replace(/\s/gi, "-") // convert spaces to dashes
    .replace(/[-]+/gi, "-") // trim repeated dashes
    .toLowerCase();
}

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
      product_category_slug: createSlug(product_category),
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
