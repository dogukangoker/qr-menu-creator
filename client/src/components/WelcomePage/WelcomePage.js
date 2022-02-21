import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './WelcomePage.module.css'
import { Link } from 'react-router-dom';

export default function WelcomePage() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [infoMsg, setInfoMsg] = useState("");
    const getCategoryData = async () => {
        setLoading(true);
        setInfoMsg("Sayfa yükleniyor...")
        try {            
            let data = await axios.get("http://localhost:5000/category/listcategory");
            setCategory(data.data.categories);
            setLoading(false);
            setInfoMsg("");
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getCategoryData();
    }, []);
    return (
        <>
        {loading ? <div className={style.loadingText}>{infoMsg}<div className={style.loading}></div></div> :
        <div>
            <div className={style.header}>
                <h5>KATEGORİLER</h5>
        </div>   
        <div className={style.wrap}>            
        {category.map((categories, index) => {
                return (
                    <Link key={categories._id} className={style.link} to={categories.category_name}>
                    <div  style={{backgroundImage: `url('${categories.category_image}')`}} className={style.category}>
                        <div   className={style.categoryName}>{categories.category_name}</div>
                    </div>
                    </Link>
                );
            })}
        </div>
        </div>}
        </>
    );
}
