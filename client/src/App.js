import React, { useEffect } from "react";
import "./components/Menu/Menu.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import Admin from "./components/Admin/Admin/Admin";
import Menu from "./components/Menu/Menu";
import AddProduct from "./components/Admin/AddProduct/AddProduct";
import ListProduct from "./components/Admin/ListProduct/ListProduct";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Category from "./components/Admin/Categories/Category";
import ReactGa from "react-ga";
import User from "./components/Admin/User/User";

const RequireAuth = ({ children }) => {
  let location = useLocation();
  /*if(!auth.user){
        return <Navigate to="/" state={{from: location}} replace />
    }*/
  return children;
};

function App() {
  useEffect(() => {
    ReactGa.initialize("UA-154865159-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<WelcomePage />} />
      <Route exact path="/:slug" element={<Menu />} />
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/admin"
        element={
          <RequireAuth>
            <LayoutAdmin />
          </RequireAuth>
        }
      >
        <Route exact path="/admin/addproduct" element={<AddProduct />} />
        <Route exact path="/admin/products" element={<ListProduct />} />
        <Route exact path="/admin/category" element={<Category />} />
        <Route exact path="/admin/index" element={<Admin />} />
        <Route exact path="/admin/user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default App;
