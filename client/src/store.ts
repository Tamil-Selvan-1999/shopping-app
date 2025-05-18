import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers";

const store = configureStore({
  reducer: productReducer,
});

export default store;
