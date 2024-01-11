import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SinglePost from "./pages/Singlepost/SinglePost";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findUser } from "./redux/store/userSlice";

function App() {
  const { accesstoken, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = window.localStorage.getItem("user");
    const userAccess = window.localStorage.getItem("token");
    const loggedUser = JSON.parse(userInfo);
    dispatch(
      findUser({
        user: loggedUser?.user,
        id: loggedUser?.id,
        accessToken: userAccess,
      })
    );
  }, []);

  useEffect(() => {
    if (user?.id) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {!user?.id && <Route exact path="/login" element={<LoginPage />} />}
        <Route path="/singlepost/:id" element={<SinglePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
