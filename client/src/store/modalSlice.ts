import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ModalState } from "../interface/interface";

const initialState: ModalState = {
  showModal: false,
  selectedProduct: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    viewProduct(state, action: PayloadAction<Product>) {
      state.showModal = true;
      state.selectedProduct = action.payload;
    },
    closeProduct(state) {
      state.showModal = false;
      state.selectedProduct = null;
    },
  },
});

export const { viewProduct, closeProduct } = modalSlice.actions;
export default modalSlice.reducer;
