import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios/api";

export const getProduct = () => async (dispatch, getState) => {
  const { data } = await axios.get("/products");
  dispatch(postProduct(data));
};

const initialState = {
  value: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    postProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { postProduct } = productSlice.actions;
