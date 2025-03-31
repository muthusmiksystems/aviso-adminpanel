import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch enquiries from the JSON file
export const fetchEnquiries = createAsyncThunk(
  "enquiries/fetchEnquiries",
  async () => {
    const response = await fetch("/data/enquiries.json");
    const data = await response.json();
    return data;
  }
);

const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState: {
    enquiries: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addEnquiry: (state, action) => {
      state.enquiries.push(action.payload);
    },
    editEnquiry: (state, action) => {
      const index = state.enquiries.findIndex(
        (enquiry) => enquiry.id === action.payload.id
      );
      if (index !== -1) {
        state.enquiries[index] = action.payload;
      }
    },
    deleteEnquiry: (state, action) => {
      state.enquiries = state.enquiries.filter(
        (enquiry) => enquiry.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enquiries = action.payload;
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addEnquiry, editEnquiry, deleteEnquiry } =
  enquiriesSlice.actions;

export default enquiriesSlice.reducer;
