import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginData, LoginState } from "../interface/interface";
import axios from "axios";

const initialState: LoginState = {
  isAdmin: false,
  isLoggedIn: false,
  user_token: null,
  loading: false,
  error: null,
};

export const loginAuthentication = createAsyncThunk<string, LoginData>(
  "login",
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:4000/login", data);
      return response.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.msg || "Failed to login");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAuthentication.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAuthentication.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.user_token = action.payload;
          state.isAdmin = true;
          state.isLoggedIn = true;
        }
      )
      .addCase(loginAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.error = "Unable to login";
      });
  },
});

export default loginSlice.reducer;
