import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { isConnected: false, username: "", id:"" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.isConnected = true;
      state.value.username = action.payload.username;
      state.value.id = action.payload.id;
    },
    logout: (state, action) => {
      state.value.isConnected = false;
      state.value.username = "";
      state.value.id = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
