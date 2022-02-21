import React, { useState, useEffect } from 'react';
import style from './Admin.module.css';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios'

const Admin = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);

    const getCategoryData = () => {
        try{
          axios.get("http://localhost:5000/category/listcategory").then(res => {
            setCategory(res.data.categories);
        });
        }catch(e){
          console.log(e)
        }
    }

    const getProductData = () => {
        try{
          axios.get("http://localhost:5000/product/listproduct").then(res => {
            setProduct(res.data.products);
        });
        }catch(e){
          console.log(e)
      }
    }
      const getUserData = () => {
        try{
          axios.get("http://localhost:5000/user/listuser").then(res => {
            setUser(res.data.users);
        });
        }catch(e){
          console.log(e)
      }
    }
    useEffect(() => {
        getCategoryData();
        getProductData();
        getUserData();
    }, []);


    return (
        <div className={style.wrapper}>
            <div className={style.headerText}>
                <h1>Admin Sayfası</h1>
            </div>
            <div className={style.boxes}>
                <div className={style.box}>
                  <div className={style.icon}>
                  <AccountBalanceIcon fontSize='large' />
                  </div>
                    <span style={{color: 'white', opacity: '0.7'}}>
                        Toplam Ürün
                    </span>
                    <div className={style.boxText}><h3>{product.length} adet</h3></div>
                </div>
                <div className={style.box2}>
                  <div className={style.icon}>
                  <AssessmentIcon fontSize='large' />
                  </div>
                  <span style={{color: 'white', opacity: '0.7'}}>
                        Toplam Kategori
                    </span>
                    <div className={style.boxText}><h3>{category.length} adet</h3></div>
                </div>
                <div className={style.box3}>
                  <div className={style.icon}>
                  <PersonIcon fontSize='large' />
                  </div>
                  <span style={{color: 'white', opacity: '0.7'}}>
                        Toplam Kullanıcı
                    </span>
                    <div className={style.boxText}><h3>{user.length} adet</h3></div>
                </div>
            </div>
        </div>
    );
};

export default Admin;