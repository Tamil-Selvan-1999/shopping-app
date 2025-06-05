import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginData, LoginState, UserProfile } from "../interface/interface";
import apiCall from "../service/apiCall";

const initialState: LoginState = {
  isAdmin: false,
  isLoggedIn: false,
  loading: false,
  error: null,
  profile: null,
};

export const loginAuthentication = createAsyncThunk<
  { token: string; profile: UserProfile },
  LoginData
>("login", async (data: LoginData, thunkAPI) => {
  try {
    const loginResponse = await apiCall.post("login", data);
    const token = loginResponse.data.token;
    const response = await apiCall.get("profile", token);
    return { token, profile: response.data };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Failed to login");
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuthentication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAuthentication.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; profile: UserProfile }>
        ) => {
          state.loading = false;
          localStorage.setItem("token", action.payload.token);
          state.isAdmin = action.payload.profile.role === "admin";
          state.isLoggedIn = true;
          state.profile = action.payload.profile;
        }
      )
      .addCase(loginAuthentication.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to login";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
