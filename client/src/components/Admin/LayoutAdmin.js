import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import style from "./LayoutAdmin.module.css";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
  let navigate = useNavigate();
  useEffect(() => {
    document.title = "Restoran Menü Yönetim Paneli";
    return navigate("/admin/index");
  }, []);
  return (
    <>
      <div className={style.sidebar}>
        <div className={style.toolbar}>
          <div className={style.logo}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3310/3310748.png"
              alt=""
            />
          </div>
          <div className={style.information}>
            <h4 className={style.title}>Restaurant Menü Yönetim Paneli</h4>
          </div>
          <div className={style.navigation}>
            <div className={style.mobileNavbar}>X</div>
            <ul>
              <li>
                <Link to="/admin/index">
                  <div className={style.list}>
                    <HomeIcon />
                    <div className={style.text}>Anasayfa</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/addproduct">
                  <div className={style.list}>
                    <PlaylistAddIcon />
                    <div className={style.text}>Ürün Ekle</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/products">
                  <div className={style.list}>
                    <ListIcon />
                    <div className={style.text}>Ürünler</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/category">
                  <div className={style.list}>
                    <PlaylistAddIcon />
                    <div className={style.text}>Kategori</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/user">
                  <div className={style.list}>
                    <PersonIcon />
                    <div className={style.text}>Kullanıcılar</div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className={style.logout}>
            <Link to="/">
              <div className={style.logoutlist}>
                <ExitToAppIcon />
                <div className={style.text}>Çıkış</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.mainContent}>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutAdmin;
