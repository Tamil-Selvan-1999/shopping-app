import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    modal: modalReducer,
  },
});

export default store;
