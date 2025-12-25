import { Route, Routes } from "react-router-dom";
import Home from "./../pages/Home";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import Cart from "./../pages/user/Cart";
import Create from "../pages/admin/Create";
import Profile from "./../pages/user/Profile";
import ProductDetail from "../pages/ProductDetail";

const MainRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/cart"
        element={<Cart />}
      />
      <Route
        path="/admin.create"
        element={<Create />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/product.detail/:id"
        element={<ProductDetail />}
      />
    </Routes>
  );
};

export default MainRouter;
