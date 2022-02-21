import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const AddUser = ({openDialog, setAddOpenDialog, error, addNewUser, setUserName, setUserPassword}) => {
    function handleClose(){
        setAddOpenDialog(false);
      }
  
    return (
        <form>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Yeni Kullanıcı Yarat</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Kullanıcı bilgilerini aşağıdaki kutucuklara yazınız.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Kullanıcı Adı"
              type="text"
              fullWidth
              variant="filled"
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              margin="dense"
              id="password"
              label="Kullanıcı Şifresi"
              type="password"
              fullWidth
              variant="filled"
              onChange={(e) => setUserPassword(e.target.value)}
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
            <Button variant="contained" color="success" onClick={addNewUser}>
              Kullanıcı Ekle
            </Button>
          </DialogActions>
        </Dialog>
      </form>
  )
}

export default AddUser;