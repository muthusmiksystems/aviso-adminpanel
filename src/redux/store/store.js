import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import jobTypesReducer from "../features/jobTypesSlice";
import categoriesReducer from "../features/categoriesSlice";
import enquiriesReducer from "../features/enquiriesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure this matches the state slice name
    jobTypes: jobTypesReducer, // Ensure this matches the state slice name
    categories: categoriesReducer,
    enquiries: enquiriesReducer,
  },
});

export default store;
