import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../constant";
import {
  dismissToast,
  triggerToast,
} from "../../components/common/toast/Toast";

// Async thunk to fetch job types
export const fetchJobTypes = createAsyncThunk(
  "jobTypes/fetchJobTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/jobtype/list");
      if (response.data.statusCode === 200) {
        triggerToast("Job Types fetched successfully!", "success");
        return response.data.data.jobTypes; // Extract jobTypes from the API response
      } else {
        triggerToast(response.data.message, "error");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch job types.";
      triggerToast(errorMessage, "error");
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to add or edit a job type
export const saveJobType = createAsyncThunk(
  "jobTypes/saveJobType",
  async (jobType, { rejectWithValue, getState }) => {
    try {
      // Retrieve the token (you can also pass it directly if available)
      const token =
        getState().auth?.token ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VhYWEyYWQ1YTRkZjRmNDk1OWE3ZmEiLCJpYXQiOjE3NDM0MzIyNDUsImV4cCI6MTc0NjAyNDI0NX0.ufPnmukD6-xqh1jfqw-kkKDZaOlPg6PwzwNGOACMiiw";

      const payload = jobType._id
        ? { ...jobType, type: "edit", jobTypeId: jobType._id } // Add edit-specific fields
        : jobType; // Add operation

      const response = await axiosInstance.post("/jobtype/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      if (response.data.code === 1) {
        const message = jobType._id
          ? "Job Type updated successfully!"
          : "Job Type added successfully!";
        triggerToast(message, "success");
        return response.data.data;
      } else {
        triggerToast(response.data.message, "error");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to save job type.";
      triggerToast(errorMessage, "error");
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to delete a job type
export const deleteJobType = createAsyncThunk(
  "jobTypes/deleteJobType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/jobtype/delete/${id}`);
      if (response.data.code === 1) {
        triggerToast("Job Type deleted successfully!", "success");
        return id;
      } else {
        triggerToast(response.data.message, "error");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete job type.";
      triggerToast(errorMessage, "error");
      return rejectWithValue(errorMessage);
    }
  }
);

const jobTypesSlice = createSlice({
  name: "jobTypes",
  initialState: {
    jobTypes: [],
    total: 0,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Job Types
      .addCase(fetchJobTypes.pending, (state) => {
        state.status = "loading";
        dismissToast();
        triggerToast("Fetching Job Types...", "info");
      })
      .addCase(fetchJobTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobTypes = action.payload;
        state.total = action.payload.length;
        state.error = null;
        dismissToast();
      })
      .addCase(fetchJobTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        dismissToast();
      })

      // Save Job Type (Add or Edit)
      .addCase(saveJobType.pending, (state) => {
        state.status = "loading";
        dismissToast();
        triggerToast("Saving Job Type...", "info");
      })
      .addCase(saveJobType.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedJobType = action.payload;
        const existingIndex = state.jobTypes.findIndex(
          (job) => job._id === updatedJobType._id
        );

        if (existingIndex >= 0) {
          // Edit operation: Update the existing job type
          state.jobTypes[existingIndex] = updatedJobType;
        } else {
          // Add operation: Add the new job type
          state.jobTypes.push(updatedJobType);
        }

        state.error = null;
        dismissToast();
      })
      .addCase(saveJobType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        dismissToast();
      })

      // Delete Job Type
      .addCase(deleteJobType.pending, (state) => {
        state.status = "loading";
        dismissToast();
        triggerToast("Deleting Job Type...", "info");
      })
      .addCase(deleteJobType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobTypes = state.jobTypes.filter(
          (job) => job._id !== action.payload
        );
        state.error = null;
        dismissToast();
      })
      .addCase(deleteJobType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        dismissToast();
      });
  },
});

export default jobTypesSlice.reducer;
