import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      phonenumber: "",
      id: "",
    },
    accesstoken: "",
    pending: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    findUser: (state, action) => {
      state.pending = false;
      state.user.phonenumber =
        action.payload.loggeduser?.phoneNumber || action?.payload?.user;
      state.user.id = action.payload.loggeduser?._id || action?.payload?.id;
      state.accesstoken =
        action.payload.loggeduser?.accessToken || action?.payload?.accessToken;
    },
    userLoading: (state) => {
      state.pending = true;
    },
    userError: (state, action) => {
      state.pending = false;
      state.error = action.payload.value;
      state.errorMessage = action.payload.message;
    },
    userLogout: (state) => {
      state.user = {
        phonenumber: "",
        id: "",
      };
      state.accesstoken = "";
    },
  },
});

export const { findUser, userLoading, userError, userLogout } =
  userSlice.actions;
export default userSlice.reducer;
