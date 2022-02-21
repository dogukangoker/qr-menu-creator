import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EditCategory = ({openEditDialog, setEditOpenDialog, setCategoryName, setCategoryImage, error, editCategory, categoryName, categoryImage}) => {
  function handleClose(){
    setEditOpenDialog(false);
  }
  return(
      <>
      <form>
        <Dialog open={openEditDialog} onClose={handleClose}>
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
              label="Kategori Adı"
              type="text"
              fullWidth
              variant="filled"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <TextField
              margin="dense"
              id="category"
              label="Kategori Resmi"
              type="text"
              fullWidth
              variant="filled"
              value={categoryImage}
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
            <Button variant="contained" color="success" onClick={editCategory}>
              Kategoriyi Düzenle
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      </>
  )
};

export default EditCategory;
