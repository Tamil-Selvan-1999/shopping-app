import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../interface/interface";
import apiCall from "../service/apiCall";
import { Bounce, toast } from "react-toastify";

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  isProductFetched: false,
};

export const fetchAllProducts = createAsyncThunk<Product[]>(
  "product/fetchAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await apiCall.get("products");
      if (response.status === "fail") {
        return thunkAPI.rejectWithValue(response.msg);
      }
      return response.data;
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.msg || err?.message || "Failed to fetch products";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.isProductFetched = true;
          toast.success("Here are the latest products", {
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
        }
      )
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
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

export default productSlice.reducer;
