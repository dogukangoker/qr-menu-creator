import React, {useEffect, useState} from 'react'
import style from './Menu.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function Menu() {
    let id = useParams();
    
    const [menu, setMenu] = useState([])
    const [categories, setCategories]   = useState([]);
    const getData = async () => {
        try{
            let data = await axios.get("http://localhost:5000/product/listproduct");
            setMenu(data.data.products);
        }catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
                <div className={style.header}>
                    <Link className={style.link} to="/"><ArrowBackIcon /> 
                    <p>Kategorilere dön</p>
                    </Link>
                </div>                
                        <div className={style.mainwrap}>          
                            {menu.map((product, index) => {
                                if(product.product_category === id.id){ 
                                    return (
                                        <div key={product._id} className={style.menucontent}>    
                                            <div className={style.imagediv}>
                                                <img className={style.productImage} src={product.product_image} />
                                                <div className={style.text}>
                                                <div className={style.productName}>
                                                    {product.product_name}
                                                </div>
                                                <div className={style.productDescription}>
                                                        {product.product_description}
                                                </div>
                                                <div className={style.productPrice}>
                                                        {product.product_price} TL
                                                </div>
                                            </div>
                                            </div>
                                            
                                        </div>
                                        
                                    )    
                                }
                            })}                                                         
                    
                    </div>
        </>
    );
}

export default Menu;

/*

<div className={style.body}>
                <div className={style.header}>HEADER</div>
                <Container>                    
                        <div className={style.mainwrap}>                        
                            <div className={style.menucontent}>
                            {menu.map((product) => (
                                <div className={style.menucontentdeep}>
                                            <img className={style.menuimg} src={product.product_image}></img>
                                            <div className={style.menucontentheadertext}>{product.product_name}</div>
                                            <div className={style.menucontenttext}>{product.product_description}</div>
                                            <div className={style.menucontenttextprice}>{product.product_price} TL</div>
                                </div>     
                                ))}    
                            </div>
                        
                    
                    </div>
                </Container>
            </div>

            */