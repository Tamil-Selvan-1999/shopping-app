import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../interface/interface";
import apiCall from "../service/apiCall";

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk<Product[]>(
  "product/fetchAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await apiCall.get("products");
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

export const toggleProductActivation = createAsyncThunk<Product, Product>(
  "product/toggleProductactivation",
  async (item: Product, thunkAPI) => {
    try {
      const index = item.index;
      const response = await apiCall.post(`products/${index}`, {});
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to update");
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
        }
      )
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        toggleProductActivation.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.items = state.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
      );
  },
});

export default productSlice.reducer;
