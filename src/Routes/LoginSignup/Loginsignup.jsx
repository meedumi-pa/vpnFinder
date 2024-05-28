import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import "../LoginSignup/loginsignup.css";
import { IconContext } from "react-icons";
import logo from "../../assets/vpnLogo_1.png";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import Toast from "../../Components/Toast/Toast";
import AuthContext from "../../Context/AuthProvider";
import ForgotPassword from "../../Components/ForgotPassword/ForgotPassword";

const Loginsignup = ({ onLogin, setIsLoggedIn }) => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [action, setAction] = useState("Login");
  const [usergroup, setUsergroup] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState({
    username,
    email,
    password,
    confirmPassword,
    usergroup,
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const signupSubmit = async () => {
    const isValid = Validation();
    if (isValid) {
      try {
        const response = await axios.post("http://localhost:3001/signup", {
          usergroup,
          username,
          email,
          password,
          confirmPassword,
        });

        resetField();
        console.log(response.data);
        // Operation was successful
        console.log("Successful Insert");
        setShowToast(true);
        showToastMessage(" Successful Registration !", "success");

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } catch (error) {
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (error.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        console.error("Error:", error.message);
      }
    } else {
      console.log(
        "Form validation failed, please correct errors before submitting."
      );
    }
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const role = response.data.role;
      onLogin(role);
      console.log(response?.data);
      console.log("login successful", response.data.role);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.role;

      setAuth({ email, password, usergroup, accessToken });
      setUsername(response.data.username);

      if (email !== "" && password !== "") {
        setUsername(response.data.username);
      }
      resetField();
      setShowToast(true);
      showToastMessage("Logged in successfully!", "success");

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      // Navigate based on user role
      // if (roles === "user") {
      //   navigate("/user");
      // } else if (roles === "admin") {
      //   navigate("/admin");
      // } else {
      //   setShowToast(true);
      //   showToastMessage("Please enter username and password.", "danger");

      //   setTimeout(() => {
      //     setShowToast(false);
      //   }, 3000);
      // }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      console.error("Error", err.message);
    }
  };
  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };
  const resetField = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setconfirmPassword("");
    setUsergroup("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setconfirmPassword(value);
        break;
      default:
        break;
    }
    setErrors((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleUsergroupChange = (event) => {
    const { name, value } = event.target;
    setUsergroup(value);

    const error = Validation();
    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };
  const Validation = () => {
    const newErrors = {};
    if (!usergroup) {
      newErrors.usergroup = "* usergroup is required";
    }
    if (!username) {
      newErrors.username = "* Username is required";
    }
    if (!email) {
      newErrors.email = "* Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = " * Invalid email format.";
    }
    if (!password) {
      newErrors.password = " * Password is required";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = " * confirm Password is required";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "* Confirm Password is not match.";
    }
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;

    // if (Object.keys(newErrors).length === 0) {
    //   console.log("Form submitted!");
    // } else {
    //   setErrors(newErrors);
    // }
  };

  const handleForgotPWd = () => {
    setShowForgotPassword(true);
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
          <div className="submit-container">
            <div
              className={action === "Login" ? "submit" : "submit gray"}
              onClick={() => {
                setAction("Login");
              }}
              id="loginButton"
            >
              Login
            </div>
            <div
              className={action === "Sign Up" ? "submit" : "submit gray"}
              onClick={() => {
                setAction("Sign Up");
              }}
              id="signupButton"
            >
              Sign Up
            </div>
          </div>
          <div className="header">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>

          {action === "Sign Up" && (
            <>
              <div className="inputs">
                <div className="input-select">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ color: "gray" }}
                    className="icon"
                  />
                  <select
                    name="usergroup"
                    value={usergroup}
                    onChange={handleUsergroupChange}
                  >
                    <option value="" disabled>
                      User group
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              {errors.usergroup && (
                <div className="error" style={{ marginLeft: "10px" }}>
                  {errors.usergroup}
                </div>
              )}
              <div className="inputs">
                <div className="input">
                  <img src={user_icon} alt="" />
                  <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Name"
                    // onChange={(e) => {
                    //   setUsername(e.target.value);
                    // }}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {errors.username && (
                <div className="error" style={{ marginLeft: "10px" }}>
                  {errors.username}
                </div>
              )}
            </>
          )}

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
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {errors.email && (
            <div className="error" style={{ marginLeft: "10px" }}>
              {errors.email}
            </div>
          )}
          <div className="inputs">
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {errors.password && (
            <div className="error" style={{ marginLeft: "10px" }}>
              {errors.password}
            </div>
          )}
          {action === "Sign Up" && (
            <>
              <div className="inputs">
                <div className="input">
                  <img src={password_icon} alt="" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {errors.confirmPassword && (
                <div className="error" style={{ marginLeft: "10px" }}>
                  {errors.confirmPassword}
                </div>
              )}
            </>
          )}

          {action === "Sign Up" && (
            <div className="submit submit1" onClick={signupSubmit}>
              Submit
            </div>
          )}
          {action == "Login" && (
            <div className="forgot-password">
              Lost Password? <Link to="forgot-password">Click Here!</Link>
            </div>
          )}

          {showForgotPassword && <ForgotPassword />}
          {action === "Login" && (
            <div className="submit submit1" onClick={loginSubmit}>
              Submit
            </div>
          )}
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

export default Loginsignup;
