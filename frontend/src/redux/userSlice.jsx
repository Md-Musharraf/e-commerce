import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios/api";
import { toast } from "react-toastify";

export const addToCart = (product) => async (dispatch, getState) => {
  try {
    const loginUser = JSON.parse(localStorage.getItem("user"));
    const currentCart = [...loginUser.cart]; // Copy current cart from local storage or state

    const existingItem = currentCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      currentCart.push({ ...product });
    }

    await axios.patch(`/user/${loginUser.id}`, { cart: currentCart });

    const updateUser = { ...loginUser, cart: currentCart };
    localStorage.setItem("user", JSON.stringify(updateUser));

    dispatch(syncUser());

    toast.success("Cart updated!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update cart");
  }
};

export const removeProductFromCart = (data) => async (dispatch, getState) => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const currentCart = [...currentUser.cart];
    const updateCart = currentCart.filter((item) => item.id != data.id);
    await axios.patch(`/user/${currentUser.id}`, { cart: updateCart });

    const updateUser = { ...currentUser, cart: updateCart };
    localStorage.setItem("user", JSON.stringify(updateUser));

    dispatch(syncUser());
  } catch (error) {
    console.log(error);
  }
};

export const increseItem = (data, one) => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = user.cart;

  const updateCart = cart.map((item) =>
    item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
  );
  await axios.patch(`/user/${user.id}`, { cart: updateCart });

  localStorage.setItem("user", JSON.stringify({ ...user, cart: updateCart }));
  dispatch(syncUser());
};

export const decreseItem = (data) => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = user.cart;
  const updateCart = cart.map((item) =>
    item.id === data.id ? { ...item, quantity: item.quantity - 1 } : item
  );
  await axios.patch(`/user/${user.id}`, { cart: updateCart });

  localStorage.setItem("user", JSON.stringify({ ...user, cart: updateCart }));
  dispatch(syncUser());
};

export const verifyUser = (loginUser, navigate) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/user?email=${loginUser.email}&password=${loginUser.password}`
    );
    if (data.length > 0) {
      const user = data[0];
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(syncUser());
      toast.success("login suceessfull");
      navigate("/");
    } else {
      toast.info("please register");
      navigate("/register");
    }
  } catch (error) {
    toast.error(error);
  }
};

export const syncUser = () => (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("user"));
  dispatch(postUserInStore(user));
};

export const postUserBackend = (data, navigate) => async (dispatch, getState) => {
  const backendUser = await axios.get(`/user?email=${data.email}`);
  if (backendUser) {
    toast.info("already have an account please login");
    navigate("/login");
  } else {
    await axios.post("/user", data);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(syncUser());
    toast.success("Register successfull");
    navigate("/");
  }
};

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postUserInStore: (state, action) => {
      state.value = action.payload;
    },
    logOutUser: (state, action) => {
      state.value = null;
      localStorage.removeItem("user");
      toast.warn("logout");
    },
  },
});

export const { postUserInStore, logOutUser } = userSlice.actions;
export default userSlice.reducer;
