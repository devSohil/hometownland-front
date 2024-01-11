import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    pending: false,
    searched: false,
    filtersListPosts: [],
    filterPostBoolen: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    getAllPosts: (state, action) => {
      state.pending = false;
      state.posts = action.payload;
    },
    deletePost: (state, action) => {
      state.pending = false;
      state.posts = action.payload;
    },
    postLoading: (state) => {
      state.pending = true;
    },
    postError: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    createPost: (state) => {
      state.pending = false;
    },
    searchPosts: (state, action) => {
      state.pending = false;
      state.searched = true;
      state.posts = action.payload || [];
    },
    clearSearch: (state) => {
      state.searched = false;
      state.pending = false;
    },
    filterSearch: (state, action) => {
      state.pending = false;
      state.posts = action.payload || state.posts;
    },
    filterPostList: (state, action) => {
      state.filtersListPosts = action.payload;
    },
    filterPostListBoolen: (state, action) => {
      state.filterPostBoolen = action.payload;
    },
  },
});

export const {
  getAllPosts,
  deletePost,
  postLoading,
  postError,
  searchPosts,
  clearSearch,
  filterSearch,
  filterPostList,
  filterPostListBoolen,
} = postSlice.actions;
export default postSlice.reducer;
