import React, { useState, useEffect } from "react";
import axios from "../../../instance/AxiosInstance";
import style from "./User.module.css";
import { Button } from "@mui/material";
import AddUser from "./utils/AddUser";
import DeleteUser from "./utils/DeleteUser";
import UpdateUser from "./utils/UpdateUser";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const User = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [openDialog, setAddOpenDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const updateUser = async () => {
    if (!userId) {
      return;
    }
    if (!userName || !userPassword) {
      setError("Kullanıcı adı ve parola boş olamaz.");
    }
    try {
      await axios.post("/user/update/" + userId, {
        username: userName,
        password: userPassword,
      });
      getUserData();
      setUserId("");
      setError("");
      setOpenEditDialog(false);
    } catch (e) {
      console.log(e);
    }
  };

  const addNewUser = () => {
    axios
      .post("/user/signup", {
        username: userName,
        password: userPassword,
      })
      .then((res) => {
        setAddOpenDialog(false);
        getUserData();
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  const deleteUser = () => {
    if (userId === "") return;
    if (dialogText === "Onaylıyorum") {
      try {
        axios.post("/user/delete/" + userId);
        setOpenDeleteDialog(false);
        setError("");
        setUserId("");
        setDialogText("");
        getUserData();
      } catch (e) {
        console.log(e);
      }
    } else {
      setError("Onay kutusu için 'Onaylıyorum' yazın.");
    }
  };

  const getUserData = async () => {
    try {
      let data = await axios.get("/user/listuser");
      setUser(data.data.users);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Kullanıcılar</h1>
        <div className={style.addButton}>
          <Button
            onClick={() => {
              setAddOpenDialog(true);
            }}
            variant="contained"
            color="success"
          >
            <AddCircleIcon />
            <span
              style={{
                marginLeft: "10px",
              }}
            >
              YENİ KULLANICI EKLE
            </span>
          </Button>
        </div>
      </div>
      <div className={style.contentHead}>
        <div className={style.userName}>
          <h3>Kullanıcı Adı</h3>
        </div>
        <div className={style.password}>
          <h3>Şifre</h3>
        </div>
        <div>
          <h3>İşlemler</h3>
        </div>
      </div>
      {user.map((user) => {
        let hashed = user.password.replace(/./g, "*");
        hashed = hashed.substring(0, 5);
        return (
          <div key={user._id} className={style.content}>
            <div className={style.user}>{user.username}</div>
            <div className={style.userpass}>{hashed}</div>
            <div className={style.user}>
              <Button
                onClick={() => {
                  setOpenEditDialog(true);
                  setUserId(user._id);
                  setUserName(user.username);
                }}
                style={{
                  marginLeft: "5rem",
                  marginRight: "2.5rem",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                variant="contained"
                color="primary"
              >
                Düzenle
              </Button>
              <Button
                onClick={() => {
                  setOpenDeleteDialog(true);
                  setUserId(user._id);
                }}
                style={{
                  marginRight: "2.5rem",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                variant="contained"
                color="error"
              >
                Sil
              </Button>
            </div>
          </div>
        );
      })}
      <AddUser
        openDialog={openDialog}
        setAddOpenDialog={setAddOpenDialog}
        error={error}
        addNewUser={addNewUser}
        setUserName={setUserName}
        setUserPassword={setUserPassword}
      />
      <DeleteUser
        setError={setError}
        error={error}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        dialogText={dialogText}
        setDialogText={setDialogText}
        deleteUser={deleteUser}
      />
      <UpdateUser
        setError={setError}
        error={error}
        updateUser={updateUser}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        setUserName={setUserName}
        setUserPassword={setUserPassword}
      />
    </div>
  );
};

export default User;
