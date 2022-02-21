import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteProduct = ({openDialog, handleClose, deleteProduct, setDialogText, dialogText}) => {
    return ( <> 
    <form>
    <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Ürünü silmek istediğinize emin misiniz?</DialogTitle>
        < DialogContent >
            <DialogContentText>
                Ürünü veritabanından silmek istiyorsanız aşağıdaki kutucuğa <strong>Onaylıyorum</strong> yazın.
            </DialogContentText>
            <TextField autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                variant="standard"
                value={dialogText}
                onChange=
                { (e) => setDialogText(e.target.value) } />
        </DialogContent>
        < DialogActions >
            <Button variant='contained' onClick={handleClose}>Vazgeç</Button>
            <Button variant='contained' color='success' onClick={deleteProduct}>
                Ürünü Sil
            </Button>
        </DialogActions >
    </Dialog>
    </form>
    
     </>
  )
};

export default DeleteProduct;