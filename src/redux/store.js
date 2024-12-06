import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import blogReducer from "./slices/blogSlice";
import portfolioReducer from "./slices/portfolioSlice";
import testimonialReducer from "./slices/testimonialSlice";
import contactReducer from "./slices/testimonialSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    blogs: blogReducer,
    portfolio: portfolioReducer,
    testimonial: testimonialReducer,
    contact: contactReducer,
  },
});
