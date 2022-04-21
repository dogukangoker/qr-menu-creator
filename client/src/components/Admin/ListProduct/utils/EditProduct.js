import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditProduct = ({
  openDialog,
  handleClose,
  setProductName,
  setProductPrice,
  setProductDescription,
  setProductCategory,
  setProductImage,
  setProductId,
  product_name,
  product_price,
  product_description,
  product_category,
  product_image,
  productId,
  updateProduct,
  error,
  category,
  handleChange,
  selectedCategory,
}) => {
  return (
    <>
      <form>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Ürünü düzenle</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Düzenlemek istediğiniz bölümleri aşağıdan düzenleyebilirsiniz.
              Düzenleme işlemi bittikten sonra kaydet butonuna basmalısınız.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Ürün Adı"
              type="text"
              fullWidth
              variant="filled"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
            />
            <span style={{ fontSize: "0.7rem" }}>
              Ürünün kayıtlı olduğu kategori değişmişse aşağıdaki bölüm boş
              gözükür.
            </span>
            <Select
              style={{ width: "100%" }}
              id="demo-simple-select"
              value={product_category}
              onChange={handleChange}
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
              margin="dense"
              id="description"
              label="Ürün Açıklaması"
              type="text"
              fullWidth
              variant="filled"
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Ürün Resmi"
              type="text"
              fullWidth
              variant="filled"
              value={product_image}
              onChange={(e) => setProductImage(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Ürün Fiyatı"
              type="text"
              fullWidth
              variant="filled"
              value={product_price}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            {error ? (
              <DialogContentText style={{ color: "red", fontSize: "1.4rem" }}>
                HATA: {error}
              </DialogContentText>
            ) : null}
          </DialogContent>

          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Kapat
            </Button>
            <Button variant="contained" color="success" onClick={updateProduct}>
              Ürünü Düzenle
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default EditProduct;
