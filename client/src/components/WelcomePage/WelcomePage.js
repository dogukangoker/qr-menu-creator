import React, { useState, useEffect } from "react";
import axios from "../../instance/AxiosInstance";
import style from "./WelcomePage.module.css";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  const [category, setCategory] = useState([]);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    let isMounted = true;

    const getCategoryData = async () => {
      await timeout(500);
      await axios.get("/category/listcategory").then((res) => {
        setCategory(res.data.categories);
      });
    };
    getCategoryData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {category && (
        <div>
          <div className={style.header}>
            <h5>KATEGORİLER</h5>
          </div>
          <div className={style.wrap}>
            {category.map((categories, index) => {
              return (
                <Link
                  key={categories._id}
                  className={style.link}
                  to={categories.category_slug}
                >
                  <div
                    style={{
                      backgroundImage: `url('${categories.category_image}')`,
                    }}
                    className={style.category}
                  >
                    <div className={style.categoryName}>
                      {categories.category_name}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
