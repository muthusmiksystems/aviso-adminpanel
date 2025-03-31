import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../constant";
import {
  dismissToast,
  triggerToast,
} from "../../components/common/toast/Toast";

// const API_URL = "http://127.0.0.1:3210/api"; // Replace with your backend URL

// Async Thunks for API Calls

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/admin/login`, credentials);
      // localStorage.setItem("token", response.data.data.token); // Store token
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/admin/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axiosInstance.put(`/user/profile/edit`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);
export const uploadImage = createAsyncThunk(
  "auth/uploadImage",
  async (file, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("profileImage", file); // Ensure the backend expects "image" as the key

      const response = await axiosInstance.post(`/upload-regimg`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  // localStorage.removeItem("token");
  return true;
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        triggerToast("Logging in...", "info");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        dismissToast();
        triggerToast(
          `Welcome ${action?.payload?.data?.user?.firstName}...  ${action.payload.message} ..!`,
          "success"
        );
        state.status = "succeeded";
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        dismissToast();
        triggerToast(action?.payload, "error");
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        dismissToast();
        triggerToast("Registering...", "info");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        dismissToast();
        triggerToast(`${action.payload.message} ..!`, "success");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        dismissToast();
        triggerToast(action?.payload, "error");
      })
      //update user
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        dismissToast();
        triggerToast("Profile Updating...", "info");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeded";
        state.user = action.payload.data.user;
        dismissToast();
        triggerToast(`${action.payload.message} ..!`, "success");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        dismissToast();
        triggerToast(action?.payload, "error");
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
