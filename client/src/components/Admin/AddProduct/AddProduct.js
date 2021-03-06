import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Alert,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";
import style from "./AddProduct.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "../../../instance/AxiosInstance";
const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [status, setStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const getCategoryData = async () => {
    try {
      let data = await axios.get("/category/listcategory");
      setCategory(data.data.categories);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  const handleSubmit = () => {
    if (
      productName === "" ||
      selectedCategory === "" ||
      productDescription === "" ||
      productImage === "" ||
      productPrice === ""
    ) {
      setErrorStatus(true);
      return;
    } else if (productName.match(/\d/)) {
      setErrorStatus(true);
    } else {
      try {
        axios
          .post("/product/addproduct", {
            product_name: productName,
            product_category: selectedCategory,
            product_description: productDescription,
            product_image: productImage,
            product_price: productPrice,
          })
          .then(function (response) {
            if (response.statusText === "Created") {
              setStatus(true);
              setOpen(true);
            }
          })
          .catch(function (err) {
            setErrorStatus(true);
            setOpen(true);
          });
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h1>YENİ ÜRÜN EKLE</h1>
      </div>
      <div className={style.Elements}>
        <Divider />
        <TextField
          required
          placeholder="Ürün Adı"
          onChange={(e) => setProductName(e.target.value)}
          className={style.textField}
          readOnly={true}
        />
        <Select
          placeholder="Kategori Seçiniz"
          id="demo-simple-select"
          value={selectedCategory}
          onChange={handleChange}
          className={style.select}
        >
          {category.map((item, index) => {
            return (
              <MenuItem key={index} value={item.category_name}>
                {item.category_name}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          required
          onChange={(e) => setProductDescription(e.target.value)}
          className={style.textField}
          placeholder="Ürün açıklama girin"
        />
        <TextField
          required
          onChange={(e) => setProductImage(e.target.value)}
          className={style.textField}
          placeholder="Ürün resmi ekleyin"
        />
        <TextField
          required
          onChange={(e) => setProductPrice(e.target.value)}
          className={style.textField}
          placeholder="Ürün fiyatı girin"
        />
        <Button
          onClick={handleSubmit}
          className={style.Button}
          variant="contained"
          color="success"
        >
          <h4>Ekle</h4>
        </Button>
      </div>
      <div className={style.statusText}>
        {status ? (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert variant="filled" severity="success">
              Ürün başarıyla eklendi.
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
      </div>
      <div className={style.statusText}>
        {errorStatus ? (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert variant="filled" severity="error">
              Bir hata meydana geldi.
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
      </div>
      <Typography className={style.infographic} variant="span">
        {" "}
        NOT : Yukarıda bulunan alanların tamamı doldurulmak zorundadır.Herhangi
        bir alanın eksik olması durumunda sistem hiçbir işlem yapmayacaktır.{" "}
      </Typography>
    </div>
  );
};
export default AddProduct;
