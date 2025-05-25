import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";
import loginReducer from "./loginSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    modal: modalReducer,
    login: loginReducer,
  },
});

export default store;
