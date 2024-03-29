import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    tags: [],
    loading: false,
    error: null,
    currentPage: 1,
    tagsPerPage: 10,
    sortBy: "count",
    sortDirection: "asc",
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTagsPerPage: (state, action) => {
      state.tagsPerPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
  },
});

export const {
  setTags,
  setLoading,
  setError,
  setCurrentPage,
  setTagsPerPage,
  setSortBy,
  setSortDirection,
} = appSlice.actions;

export default appSlice.reducer;
