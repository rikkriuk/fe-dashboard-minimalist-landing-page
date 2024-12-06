import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const initialState = {
  portfolios: [],
  portfolio: {},
  loading: false,
  error: null,
  pagination: {},
};

const token = localStorage.getItem("token");
export const fetchPortfolios = createAsyncThunk(
  "portfolios/fetchPortfolios",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/portfolio`, {
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
        error.response?.data?.message || "Failed to fetch portfolios!"
      );
    }
  }
);

export const addPortfolio = createAsyncThunk(
  "portfolios/addPortfolio",
  async (portfolio, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/portfolio`, portfolio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add portfolio!"
      );
    }
  }
);

export const updatePortfolio = createAsyncThunk(
  "portfolios/updatePortfolio",
  async ({ id, portfolio }, { rejectWithValue }) => {
    try {
      await axios.put(`${BASE_URL}/portfolio/${id}`, portfolio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update portfolio!"
      );
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  "portfolios/deletePortfolio",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/portfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete portfolio!"
      );
    }
  }
);

const portfoliosSlice = createSlice({
  name: "portfolios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch portfolios
      .addCase(fetchPortfolios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add case for addPortfolio
      .addCase(addPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios.push(action.payload);
      })
      .addCase(addPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add case for updatePortfolio
      .addCase(updatePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add case for deletePortfolio
      .addCase(deletePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = state.portfolios.filter(
          (portfolio) => portfolio.id !== action.payload
        );
      })
      .addCase(deletePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default portfoliosSlice.reducer;
