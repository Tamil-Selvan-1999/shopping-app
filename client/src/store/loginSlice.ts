import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoginData,
  LoginState,
  RegisterData,
  UserProfile,
} from "../interface/interface";
import apiCall from "../service/apiCall";
import { toast, Bounce } from "react-toastify";

const initialState: LoginState = {
  isAdmin: false,
  isLoggedIn: false,
  loading: false,
  error: null,
  profile: null,
};

export const registerAuthentication = createAsyncThunk<
  { token: string; profile: UserProfile },
  RegisterData
>("register", async (data: RegisterData, thunkAPI) => {
  try {
    await apiCall.post("register", data);
    const { username, password } = data;
    const loginResponse = await apiCall.post("login", { username, password });
    if (loginResponse.status === "fail") {
      return thunkAPI.rejectWithValue(loginResponse.msg);
    }
    const token = loginResponse.data.token;
    const profileResponse = await apiCall.get("profile", token);
    if (profileResponse.status === "fail") {
      return thunkAPI.rejectWithValue(profileResponse.msg);
    }
    return { token, profile: profileResponse.data };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.msg || "Failed to register");
  }
});

export const loginAuthentication = createAsyncThunk<
  { token: string; profile: UserProfile },
  LoginData
>("login", async (data: LoginData, thunkAPI) => {
  try {
    const loginResponse = await apiCall.post("login", data);
    const token = loginResponse.data.token;
    const response = await apiCall.get("profile", token);
    if (response.status === "fail") {
      return thunkAPI.rejectWithValue(response.msg);
    }
    return { token, profile: response.data };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.msg || "Failed to login");
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
      localStorage.clear();
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
          localStorage.clear();
          localStorage.setItem("token", action.payload.token);
          state.isAdmin = action.payload.profile.role === "admin";
          state.isLoggedIn = true;
          state.profile = action.payload.profile;
        }
      )
      .addCase(loginAuthentication.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to login";
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
      })
      .addCase(registerAuthentication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerAuthentication.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; profile: UserProfile }>
        ) => {
          state.loading = false;
          localStorage.clear();
          localStorage.setItem("token", action.payload.token);
          state.isAdmin = action.payload.profile.role === "admin";
          state.isLoggedIn = true;
          state.profile = action.payload.profile;
        }
      )
      .addCase(registerAuthentication.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to register";
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

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
