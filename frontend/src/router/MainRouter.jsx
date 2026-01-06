import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncUser } from "../redux/userSlice";
const Home = lazy(() => import("./../pages/Home"));
const Register = lazy(() => import("./../pages/Register"));
const Login = lazy(() => import("./../pages/Login"));
const Cart = lazy(() => import("./../pages/user/Cart"));
const Create = lazy(() => import("../pages/admin/Create"));
const Profile = lazy(() => import("./../pages/user/Profile"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const ForgetPassword = lazy(() => import("./../pages/user/ForgetPassword"));

const MainRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncUser());
  }, []);

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
      <Route
        path="/forget-password"
        element={<ForgetPassword />}
      />
    </Routes>
  );
};

export default MainRouter;
