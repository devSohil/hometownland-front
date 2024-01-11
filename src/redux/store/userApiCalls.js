import { findUser, userLoading, userError } from "./userSlice";
import axios from "axios";
export const userLoginApi = async (user, dispatch) => {
  dispatch(userLoading());
  dispatch(userError(false));

  try {
    const userdata = await axios.post("http://localhost:2345/user/login", user);
    const userDataPayload = {
      loggeduser: {
        _id: userdata.data.user._id,
        phoneNumber: userdata.data.user.phoneNumber,
        accessToken: userdata.data.accessToken,
      },
    };
    window.localStorage.setItem("token", userdata.data.accessToken);
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        user: userdata.data.user.phoneNumber,
        id: userdata.data.user._id,
      })
    );
    dispatch(findUser(userDataPayload));
  } catch (err) {
    dispatch(userError({ value: true, message: err.response.data.error }));
  }
};
