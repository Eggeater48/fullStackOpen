import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    notLoggedInUser: {
      username: "",
      password: "",
    },
    loggedInUser: {},
  },
  reducers: {
    // TODO look at this and figure out a possible better solution for this (cuz this really doesnt feel like the best option) ^_^
    setLoggedInUser(state, action) {
      state.user.loggedInUser = action.payload;
    },
    clearUserNameAndPassword(state) {
      state.notLoggedInUser = { username: "", password: "" };
    },
    logOut(state) {
      state.user.notLoggedInUser = { username: "", password: "" };
      state.user.loggedInUser = {};
    },
  },
});

export const handierLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
  };
};

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
