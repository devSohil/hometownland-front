import React, { useEffect, useState } from "react";
import { MdOutlineHomeWork, MdOutlineAdd } from "react-icons/md";
import { RiMenu5Line } from "react-icons/ri";
import { IoCloseOutline, IoAdd, IoAddCircleOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/store/userSlice";
const Navbar = () => {
  const [toggle, setToggle] = useState(true);
  const { user, accesstoken } = useSelector((state) => state.user);
  const [logedUser, setLogedUser] = useState(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setLogedUser(user);
  }, [user]);
  const handleLogout = async () => {
    try {
      dispatch(userLogout());
      navigate("/");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbarContainer">
      <div className="logoConatiner">
        <MdOutlineHomeWork className="siteLogo" /> hometownlands
      </div>
      <div className="toggleButton" onClick={() => setToggle(!toggle)}>
        {toggle && <RiMenu5Line className="menuIcon" />}
        {!toggle && <IoCloseOutline className="menuIcon" />}
      </div>
      {toggle ? (
        <div className="navLists">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {logedUser?.id && (
              <li className="createpost">
                <Link to="createpost">
                  <div>
                    <IoAdd className="addIcon" />
                  </div>
                  <div>Sell</div>
                </Link>
              </li>
            )}
            {!logedUser?.id && (
              <Link to="login">
                <li className="loginButton">Login</li>
              </Link>
            )}
            {/* {logedUser?.id && (
              <Link to="login">
                <li className="profilePic">
                  <RxAvatar />
                </li>
              </Link>
            )} */}
            {logedUser?.id && (
              <Link to="login">
                <li onClick={handleLogout} className="loginButton">
                  Logout
                </li>
              </Link>
            )}
          </ul>
        </div>
      ) : (
        <div className="navListsMobile">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {logedUser?.id && (
              <li className="createpost">
                <Link to="/createpost">
                  <div>
                    <IoAdd className="addIcon" />
                  </div>
                  <div>Sell</div>
                </Link>
              </li>
            )}
            {!logedUser?.id && (
              <Link to="login">
                <li className="loginButton">Login</li>
              </Link>
            )}
            {/* {logedUser?.id && (
              <Link to="login">
                <li className="profilePic">
                  <RxAvatar />
                </li>
              </Link>
            )} */}
            {logedUser?.id && (
              <Link to="login">
                <li onClick={handleLogout} className="loginButton">
                  Logout
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
