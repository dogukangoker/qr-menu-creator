import express from 'express';
import Category from '../Models/CategoryModel.js';

const router = express.Router();

router.post("/addcategory", async(req, res) => {
    try {
        console.log(req.body)
        const {category_name, category_image} = req.body;
        const categoryExists = await Category.findOne({category_name});
        if (categoryExists) {
            return res
                .status(400)
                .json({message: 'Kategori mevcut.'});
        }
        const createdCategory = await Category.create({
            category_name,
            category_image,
            category_slug: category_name
                .toLowerCase()
                .replace(/\s+/g, '-')
        })
        return res
            .status(201)
            .json(createdCategory);
    } catch (e) {
        return res.json({message: e})
    }
})

router.get("/listcategory", async(req, res) => {
    try {
        const {category_name, category_image} = req.body;
        const categories = await Category.find({})
        if (!categories) {
            return res
                .status(400)
                .json({message: 'Kategori yok.'})
        }
        res
            .status(200)
            .json({categories, message: 'Kategoriler listelendi.'})
    } catch (e) {
        res
            .status(400)
            .json({message: e.message})
    }
})

router.post("/delete/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res
                .status(400)
                .json({message: 'Kategori bulunamadı.'})
        }
        return res
            .status(200)
            .json({message: 'Kategori silindi.'})
    } catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({message: 'Eksik kategori id bilgisi girildi.'})
    }
})

router.post("/update/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {category_name, category_image, category_slug} = req.body;
        const category = await Category.findByIdAndUpdate(id, {category_name, category_image, category_slug})
        if (!category) {
            return res
                .status(400)
                .json({message: 'Kategori bulunamadı.'})
        }
        return res
            .status(200)
            .json({message: 'Kategori güncellendi.'})
    } catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({message: 'Eksik kategori id bilgisi girildi.'})
    }
})

export default router;