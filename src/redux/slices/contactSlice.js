import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  contacts: [],
  loading: false,
  pagination: {},
  error: null,
};

const token = localStorage.getItem("token");

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/contact`, {
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
        error.response?.data?.message || "Failed to get contacts"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.data;
        state.pagination = {
          currentPage: action.payload.data.page,
          totalPage: action.payload.data.totalPages,
        };
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
