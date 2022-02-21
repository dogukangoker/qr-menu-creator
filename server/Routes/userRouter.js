import express from 'express';
import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs'

const router = express.Router();

router.post("/signup", async(req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;
        const userExists = await User.findOne({username});
        if(userExists){

            return res.status(400).json({message: 'Kullanıcı mevcut.'})
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const createdUser = await User.create({
            username,
            password: hashedPassword,
        })
        return res.status(201).json(createdUser);
    }catch(e){
        console.log(e);
        return res.json({message: 'Hata.'})
    }
})

router.post("/signin", async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: 'Kullanıcı kayıtlı değil.'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'Şifre yanlış.'});
        }

        return res.status(200).json({user, message: 'Giriş başarılı.'});
    }catch (e) {
        console.log(e);
        res.status(400).json({message: e.message});
    }
})
router.get("/listuser" , async(req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res
                .status(400)
                .json({message: 'Kullanıcı yok.'})
        }
        res
            .status(200)
            .json({users, message: 'Kullanıcılar listelendi.'})
    } catch (e) {
        res
            .status(400)
            .json({message: e.message})
    }
})

router.post("/update/:id", async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            return res.status(400).json({message: 'Kullanıcı kayıtlı değil.'});
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, {
            username,
            password: hashedPassword,
        }, {new: true});
        return res.status(200).json(updatedUser);
    }catch (e) {
        console.log(e);
        res.status(400).json({message: e.message});
    }
})
            

router.post("/delete/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({message: 'Kullanıcı bulunamadı.'})
        }
        return res.status(200).json({message: 'Kullanıcı silindi.'})
    }catch(e){
        console.log(e);
        return res.status(400).json({message: 'Hata.'})
    }
})

export default router;