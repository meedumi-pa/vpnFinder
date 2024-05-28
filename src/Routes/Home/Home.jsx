import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Admin from "../Admin/Admin";
import User from "../User/User";
import Loginsignup from "../LoginSignup/Loginsignup";
const Home = () => {
  // const [role, setRole] = useState("");
  // const navigate = useNavigate();

  // const handleLoginSuccess = (role) => {
  //   setRole(role);
  // };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001")
  //     .then((res) => {
  //       if (res.data.valid) {
  //         setRole(res.data.role);
  //         console.log("User Role:", res.data.role);
  //       } else {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching user role:", err);
  //       navigate("/login");
  //     });
  // }, [navigate]);
  return (
    <div>
      <h1>Home</h1>
      {/* <Loginsignup /> */}
      {/* {role === "admin" && <Admin />}
      {role === "admin" ? (
        <Admin />
      ) : (
        <Loginsignup onLoginSuccess={handleLoginSuccess} />
      )}
      {role === "user" ? (
        <User />
      ) : (
        <Loginsignup onLoginSuccess={handleLoginSuccess} />
      )} */}
    </div>
  );
};

export default Home;
