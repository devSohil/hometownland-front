import { configureStore } from "@reduxjs/toolkit";
import userReduer from "./userSlice";
import postReduer from "./postSlice";
export default configureStore({
  reducer: {
    user: userReduer,
    post: postReduer,
  },
});
