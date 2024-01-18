import axios from "axios";
import {
  getAllPosts,
  postLoading,
  postError,
  deletePost,
  searchPosts,
  filterSearch,
} from "./postSlice";

export const getAllPostApi = async (dispatch) => {
  dispatch(postLoading());
  try {
    const postdata = await axios.get(
      "https://htl-backend-92bi.onrender.com/post"
    );
    dispatch(getAllPosts(postdata.data));
  } catch (err) {
    dispatch(postError(true));
  }
};

export const createPostApi = async (
  { formData, userId, navigate },
  dispatch
) => {
  dispatch(postLoading());
  try {
    const newpost = await axios.post(
      `https://htl-backend-92bi.onrender.com/post/createpost/${userId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (newpost.status === 201) {
      alert("post created");
      navigate("/");
    }
  } catch (err) {
    dispatch(postError({ value: true, message: err.response.data.error }));
    alert(err.response.data.error);
  }
};

export const searchPostsApi = async (search, dispatch) => {
  dispatch(postLoading());
  try {
    const filteredpost = await axios.get(
      `https://htl-backend-92bi.onrender.com/post/search/${search}`
    );
    dispatch(searchPosts(filteredpost.data));
  } catch (err) {
    dispatch(postError(true));
  }
};

export const filterPostsApi = async (filters, dispatch) => {
  dispatch(postLoading());
  try {
    const filteredpost = await axios.get(
      `https://htl-backend-92bi.onrender.com/post/filter/`,
      {
        params: filters,
      }
    );
    dispatch(filterSearch(filteredpost.data));
  } catch (err) {
    dispatch(postError(true));
  }
};
