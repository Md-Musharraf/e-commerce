import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios/api";

export const getProduct = (product) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/products?_start=${product.length}&_limit=8`);
    dispatch(addProducts(data));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const postNewProduct = async (product) => {
  try {
    await axios.post("/products", product);
    console.log(product);
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  value: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const newProducts = action.payload.filter(
        (p) => !state.value.some((item) => item.id === p.id)
      );
      state.value = [...state.value, ...newProducts];
    },

    resetProducts: (state) => {
      state.value = [];
      state.hasMore = true;
    },
  },
});

export default productSlice.reducer;
export const { addProducts, resetProducts } = productSlice.actions;
