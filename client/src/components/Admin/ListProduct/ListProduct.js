import React, { useState, useEffect } from "react";
import style from "./ListProduct.module.css";
import axios from "axios";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProduct from "./utils/EditProduct";
import DeleteProduct from "./utils/DeleteProduct";
import Pagination from "./utils/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ListProduct = () => {
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);
  const [productId, setProductId] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [editable, setEditable] = useState(false);
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [error, setError] = useState("");

  const [product_name, setProductName] = useState("test");
  const [product_price, setProductPrice] = useState();
  const [product_description, setProductDescription] = useState();
  const [product_category, setProductCategory] = useState();
  const [product_image, setProductImage] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [listCategory, setListCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };
  function handleCategoryChange(e) {
    setListCategory(e.target.value);
  }

  const handleDeleteClose = () => {
    setopenDeleteDialog(false);
  };
  const handleEditClose = () => {
    setopenEditDialog(false);
  };

  const getCategoryData = async () => {
    try {
      let data = await axios.get(
        "http://44.201.48.125:5000/category/listcategory"
      );
      setCategory(data.data.categories);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const getMenuData = async () => {
      try {
        let data = await axios.get(
          "http://44.201.48.125:5000/product/listproduct"
        );
        setMenu(data.data.products);
      } catch (e) {
        console.log(e);
      }
    };
    getMenuData();
    getCategoryData();
  }, []);
  useEffect(() => {
    getCategoryData();
  }, [editable]);

  const deleteProduct = async () => {
    if (!productId) return;
    if (dialogText === "Onaylıyorum") {
      try {
        let data = await axios.post(
          "http://44.201.48.125:5000/product/delete/" + productId
        );
        console.log(data);
        setEditable(true);
        getCategoryData();
        setDialogText("");
        setProductId("");
        handleDeleteClose();
      } catch (e) {
        console.log(e);
      }
    } else {
      handleDeleteClose();
      setDialogText("");
    }
  };

  const updateProduct = async () => {
    if (!productId) return;
    if (
      !product_name ||
      !product_price ||
      !product_description ||
      !product_category ||
      !product_image
    ) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    } else if (product_name.match(/\d/)) {
      setError("Ürün adında rakam bulunamaz.");
      return;
    } else if (isNaN(product_price)) {
      setError("Fiyat bölümüne sadece rakam girmelisiniz.");
    } else {
      try {
        let data = await axios.post(
          "http://44.201.48.125:5000/product/update/" + productId,
          {
            product_name,
            product_price,
            product_description,
            product_category,
            product_image,
          }
        );
        console.log(data);
        setEditable(true);
        getCategoryData();
        setProductId("");
        handleEditClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  //SAYFALANDIRMA
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = menu.slice(indexOfFirstProduct, indexOfLastProduct);
  // sayfa degistirme
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>ÜRÜNLER</h1>
      </div>
      <div className={style.categoryselect}>
        <h5>
          Kategorize ederek ürünleri listelemek için aşağıdaki bölümden kategori
          seçiniz.
        </h5>
        <Select
          style={{ width: "100%" }}
          id="demo-simple-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {category.map((item, index) => {
            return (
              <MenuItem key={index} value={item.category_name}>
                {item.category_name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th width="25%">Ürün Adı</th>
            <th>Kategori</th>
            <th>Ürün Açıklaması</th>
            <th>Ürün Fiyatı</th>
            <th className={style.tableImage}>Ürün Resmi</th>
            <th>Düzenleme</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {listCategory
            ? currentProducts
                .filter((item) => item.product_category === listCategory)
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{item.product_category}</td>
                      <td>{item.product_description}</td>
                      <td>{item.product_price}</td>
                      <td>
                        <img
                          src={item.product_image}
                          width="100"
                          height="100"
                        />
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            setProductName(item.product_name);
                            setProductPrice(item.product_price);
                            setProductDescription(item.product_description);
                            setProductCategory(item.product_category);
                            setProductImage(item.product_image);
                            setProductId(item._id);
                            setopenEditDialog(true);
                          }}
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                        >
                          Düzenle
                        </Button>
                      </td>
                      <td
                        onClick={() => {
                          setopenDeleteDialog(true);
                          setProductId(item._id);
                        }}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                        >
                          Sil
                        </Button>
                      </td>
                    </tr>
                  );
                })
            : currentProducts.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.product_category}</td>
                    <td>{item.product_description}</td>
                    <td>{item.product_price}</td>
                    <td>
                      <img
                        src={item.product_image}
                        alt="product_image"
                        width="100"
                        height="100"
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setProductName(item.product_name);
                          setProductPrice(item.product_price);
                          setProductDescription(item.product_description);
                          setProductCategory(item.product_category);
                          setProductImage(item.product_image);
                          setProductId(item._id);
                          setopenEditDialog(true);
                        }}
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                      >
                        Düzenle
                      </Button>
                    </td>
                    <td
                      onClick={() => {
                        setopenDeleteDialog(true);
                        setProductId(item._id);
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                      >
                        Sil
                      </Button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={menu.length}
        paginate={paginate}
      />
      <DeleteProduct
        openDialog={openDeleteDialog}
        deleteProduct={deleteProduct}
        handleClose={handleDeleteClose}
        dialogText={dialogText}
        setDialogText={setDialogText}
      />
      <EditProduct
        openDialog={openEditDialog}
        handleClose={handleEditClose}
        item={item}
        setProductName={setProductName}
        setProductPrice={setProductPrice}
        setProductDescription={setProductDescription}
        setProductCategory={setProductCategory}
        setProductImage={setProductImage}
        setProductId={setProductId}
        product_name={product_name}
        product_price={product_price}
        product_description={product_description}
        product_category={product_category}
        product_image={product_image}
        productId={productId}
        updateProduct={updateProduct}
        error={error}
        category={category}
        handleChange={handleChange}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default ListProduct;
