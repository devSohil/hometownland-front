import React, { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoginApi } from "../../redux/store/userApiCalls";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { pending, error, errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      if (phoneNumber && password) {
        userLoginApi({ phoneNumber, password }, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <div className="formContainer">
        <form>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={pending}
            className="loginButton"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <span className="error">{error && errorMessage}</span>
      </div>
    </div>
  );
};

export default LoginPage;
