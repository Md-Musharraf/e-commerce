import { configureStore } from "@reduxjs/toolkit";
import userReducer, { postUserInStore } from "./userSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
