import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteUser = ({
    openDeleteDialog,
    setOpenDeleteDialog,
    deleteUser,
    dialogText,
    setDialogText,
    error,
    setError
}) => {
    function handleClose() {
        setOpenDeleteDialog(false);
        setError("");
    }

    return (
        <form>
            <Dialog open={openDeleteDialog} onClose={handleClose}>
                <DialogTitle>Ürünü silmek istediğinize emin misiniz?</DialogTitle>
                < DialogContent >
                    <DialogContentText>
                        Ürünü veritabanından silmek istiyorsanız aşağıdaki kutucuğa
                        <strong>Onaylıyorum</strong>
                        yazın.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={dialogText}
                        onChange=
                        { (e) => setDialogText(e.target.value) }/> {error
                        ? (
                            <DialogContentText
                                style={{
                                color: "red",
                                fontSize: "1.4rem"
                            }}>
                                HATA: {error}
                            </DialogContentText>
                        )
                        : null}
                </DialogContent>
                < DialogActions >
                    <Button variant='contained' onClick={handleClose}>Vazgeç</Button>
                    <Button variant='contained' color='success' onClick={deleteUser}>
                        Kullanıcıyı Sil
                    </Button>
                </DialogActions >

            </Dialog>
        </form>
    )
}

export default DeleteUser