import express from "express";
import Category from "../Models/CategoryModel.js";
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

router.post("/addcategory", async (req, res) => {
  try {
    console.log(req.body);
    const { category_name, category_image } = req.body;
    const categoryExists = await Category.findOne({ category_name });
    if (categoryExists) {
      return res.status(400).json({ message: "Kategori mevcut." });
    }
    const createdCategory = await Category.create({
      category_name,
      category_image,
      category_slug: createSlug(category_name),
    });
    Logger.info(`${category_name} kategorisi oluşturuldu.`);
    return res.status(201).json(createdCategory);
  } catch (e) {
    Logger.error(e);
    return res.json({ message: e });
  }
});

router.get("/listcategory", async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.status(400).json({ message: "Kategori yok." });
    }
    Logger.info(`${categories.length} adet kategori listelendi.`);
    res.status(200).json({ categories, message: "Kategoriler listelendi." });
  } catch (e) {
    Logger.error(e);
    res.status(400).json({ message: e.message });
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(400).json({ message: "Kategori bulunamadı." });
    }
    Logger.info(`${category.category_name} kategorisi silindi.`);
    return res.status(200).json({ message: "Kategori silindi." });
  } catch (e) {
    Logger.error(e);
    return res
      .status(400)
      .json({ message: "Eksik kategori id bilgisi girildi." });
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, category_image } = req.body;
    const category = await Category.findByIdAndUpdate(id, {
      category_name,
      category_image,
      category_slug: createSlug(category_name),
    });
    if (!category) {
      return res.status(400).json({ message: "Kategori bulunamadı." });
    }
    Logger.info(`${category.category_name} kategorisi güncellendi.`);
    return res.status(200).json({ message: "Kategori güncellendi." });
  } catch (e) {
    Logger.error(e);
    return res
      .status(400)
      .json({ message: "Eksik kategori id bilgisi girildi." });
  }
});

export default router;
