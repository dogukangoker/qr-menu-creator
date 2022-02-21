import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const AddCategory = ({openDialog, setAddOpenDialog, error, addNewCategory, setCategoryName, setCategoryImage}) => {
  function handleClose(){
    setAddOpenDialog(false);
  }
  return (
    <>
      <form>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Ürünü düzenle</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Eklemek istediğiniz kategoriye ait bilgileri aşağıdaki boşluklara girmelisiniz.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Kategori Adı"
              type="text"
              fullWidth
              variant="filled"
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <TextField
              margin="dense"
              id="category"
              label="Kategori Resmi"
              type="text"
              fullWidth
              variant="filled"
              onChange={(e) => setCategoryImage(e.target.value)}
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
            <Button variant="contained" color="success" onClick={addNewCategory}>
              Kategoriyi Ekle
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default AddCategory;
