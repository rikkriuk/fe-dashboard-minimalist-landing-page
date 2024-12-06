import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  testimonials: [],
  testimonial: {},
  loading: false,
  error: null,
  pagination: {},
};

const token = localStorage.getItem("token");

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/testimonial`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search,
          page,
          limit,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch testimonials!"
      );
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (testimonial, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/testimonial`,
        testimonial,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add testimonial!"
      );
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async ({ id, testimonial }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/testimonial/${id}`,
        testimonial,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update testimonial!"
      );
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/testimonial/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete testimonial!"
      );
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload.data;
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add case for addTestimonial
      .addCase(addTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials.push(action.payload);
      })
      .addCase(addTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add case for updateTestimonial
      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.testimonials.findIndex(
          (testimonial) => testimonial.id === action.payload.id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add case for deleteTestimonial
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial.id !== action.payload
        );
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testimonialsSlice.reducer;
