import React, { useState } from "react";
import Container from "@mui/material/Container";
import { TextField, Button, Divider } from "@mui/material";

import axios from "../../instance/AxiosInstance";
import style from "./login.module.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameInputChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    axios
      .post("/user/signin", {
        username: username,
        password: password,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <body className={style.page}>
        <form>
          <div className={style.card}>
            <Container>
              <div className={style.containercard}>
                <div className={style.elements}>
                  <div className={style.elementsheadertext}>
                    Menü Yönetim Paneli
                  </div>
                  <Divider className={style.divider} color="success"></Divider>
                  <div className={style.elementselements}>
                    <TextField
                      fullWidth
                      onChange={handleUsernameInputChange}
                      className={style.elementinput}
                      label="Kullanıcı Adı"
                      variant="filled"
                    />
                    <div className={style.input}>
                      <TextField
                        onChange={handlePasswordInputChange}
                        type="password"
                        fullWidth
                        className={style.elementinput}
                        label="Şifre"
                        variant="filled"
                      />
                    </div>
                    <div className={style.buttondiv}>
                      <Button
                        onClick={handleSubmit}
                        className={style.elementbutton}
                        variant="contained"
                        color="success"
                      >
                        Giriş Yap
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </form>
      </body>
    </>
  );
};

export default Login;
