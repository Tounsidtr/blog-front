import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.articles = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { addArticle, setArticles } = articlesSlice.actions;

export default articlesSlice.reducer;