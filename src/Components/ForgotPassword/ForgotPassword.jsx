import React, { useState, useRef } from "react";
import axios from "axios";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import "../../Routes/LoginSignup/loginsignup.css";
import Toast from "../Toast/Toast";
import { IconContext } from "react-icons";
import logo from "../../assets/vpnLogo_1.png";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const errRef = useRef();
  const userRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();
  const forgotPwdSubmit = () => {
    try {
      if (password === confirmPassword) {
        const response = axios.put("http://localhost:3001/pwd", {
          email,
          password,
        });
      }
      Resetfields();
      setShowToast(true);
      showToastMessage("Password changed successfully!", "success");

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      navigate("/");
    } catch (err) {
      console.error("Error", err.message);
    }
  };
  const Validation = () => {};
  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };
  const Resetfields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="nav-bar">
          <h1>Vpn Finder</h1>
          <div className="Vpn__header-logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </IconContext.Provider>
      <div className="login">
        <div className="container">
          <div className="header">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="text">Forgot Password</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                name="email"
                id="email"
                ref={userRef}
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="inputs">
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="submit submit1" onClick={forgotPwdSubmit}>
            Submit
          </div>
        </div>

        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
