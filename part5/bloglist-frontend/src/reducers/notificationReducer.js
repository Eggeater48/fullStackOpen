import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", type: "" },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload;
    },
    clearNotification(state) {
      state.message = "";
      state.type = "";
    },
  },
});

export const setClearNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification);
    });
  };
};
