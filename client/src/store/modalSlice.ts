import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ModalState } from "../interface/interface";
import { toggleProductActivation } from "./productSlice";
import { toast, Bounce } from "react-toastify";

const initialState: ModalState = {
  showModal: false,
  selectedProduct: null,
  isLoading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(toggleProductActivation.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleProductActivation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(toggleProductActivation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  },
});

export const { viewProduct, closeProduct } = modalSlice.actions;
export default modalSlice.reducer;
