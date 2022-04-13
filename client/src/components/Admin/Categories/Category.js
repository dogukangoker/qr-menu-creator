import { Button } from "@mui/material";
import style from "./Category.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCategory from "./utils/AddCategory";
import EditCategory from "./utils/EditCategory";
import DeleteCategory from "./utils/DeleteCategory";
import Pagination from "./utils/Pagination";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [added, setAdded] = useState(false);
  const [openAddDialog, setAddOpenDialog] = useState(false);
  const [error, setError] = useState("");
  const [openEditDialog, setEditOpenDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  const deleteCategory = () => {
    if (categoryId === "") return;
    if (dialogText == "Onaylıyorum") {
      try {
        axios.post("/api/category/delete/" + categoryId);
        setOpenDeleteDialog(false);
        setError("");
        setCategoryId("");
        setDialogText("");
        getCategoryData();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getCategoryData = async () => {
    try {
      let data = await axios.get("/api/category/listcategory");
      setCategory(data.data.categories);
    } catch (e) {
      console.log(e);
    }
  };

  const addNewCategory = async () => {
    if (categoryName == "" || categoryImage == "") {
      setError("Lütfen bütün alanları doldurun.");
    } else {
      try {
        let data = await axios.post("/api/category/addcategory", {
          category_name: categoryName,
          category_image: categoryImage,
        });
        setAddOpenDialog(false);
        setError("");
        setCategoryImage("");
        getCategoryData();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const editCategory = async () => {
    var regex = /\d/;
    if (categoryName == "" || categoryImage == "") {
      setError("Please fill all fields");
    } else if (categoryName.match(regex)) {
      setError("Kategori adı sadece harflerden oluşmalıdır!");
    } else {
      try {
        let data = await axios.post("/api/category/update/" + categoryId, {
          category_name: categoryName,
          category_image: categoryImage,
          category_slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
        });
        setEditOpenDialog(false);
        setError("");
        setCategoryName("");
        setCategoryId("");
        setCategoryImage("");
        getCategoryData();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);
  const handleClickOpenDialog = () => {
    setAddOpenDialog(true);
  };

  //SAYFALANDIRMA
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentCategories = category.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // sayfa degistirme
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>KATEGORİLER</h1>
        <Button
          className={style.addButton}
          color="success"
          onClick={handleClickOpenDialog}
          variant="contained"
        >
          <AddCircleIcon />
          <span
            style={{
              marginLeft: "10px",
            }}
          >
            YENİ KATEGORİ EKLE
          </span>
        </Button>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.tableId} width="5%">
              ID
            </th>
            <th width="25%">Kategori Adı</th>
            <th>Kategori Slug</th>
            <th className={style.tableImage}>Kategori Resmi</th>
            <th>Düzenleme</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.category_name}</td>
                <td>{item.category_slug}</td>
                <td>{item.category_image}</td>
                <td>
                  <Button
                    onClick={() => {
                      setEditOpenDialog(true);
                      setCategoryName(item.category_name);
                      setCategoryImage(item.category_image);
                      setCategoryId(item._id);
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    Düzenle
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setOpenDeleteDialog(true);
                      setCategoryId(item._id);
                    }}
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
        totalProducts={category.length}
        paginate={paginate}
      />
      <AddCategory
        openDialog={openAddDialog}
        setAddOpenDialog={setAddOpenDialog}
        setCategoryName={setCategoryName}
        setCategoryImage={setCategoryImage}
        error={error}
        addNewCategory={addNewCategory}
        category={category}
      />
      <EditCategory
        openEditDialog={openEditDialog}
        setEditOpenDialog={setEditOpenDialog}
        setCategoryName={setCategoryName}
        setCategoryImage={setCategoryImage}
        categoryName={categoryName}
        categoryImage={categoryImage}
        error={error}
        editCategory={editCategory}
      />
      <DeleteCategory
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        setDialogText={setDialogText}
        categoryId={categoryId}
        dialogText={dialogText}
        deleteCategory={deleteCategory}
      />
    </div>
  );
};

export default Category;
