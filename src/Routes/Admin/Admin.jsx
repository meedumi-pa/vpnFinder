import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebardata } from "../../Components/SidebarData/Sidebardata";
import "../../apps.css";
import { IconContext } from "react-icons";
import logo from "../../assets/vpnLogo_1.png";
import axios from "axios";

const Admin = ({ isLoggedIn }) => {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  if (!isLoggedIn || location.pathname === "/") {
    return null;
  }
  const handleLogout = async () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        console.log("clicked");
        // location.reload(true);

        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="admin">
          <div className="navbar">
            <h1>Vpn Finder</h1>
            <div className="Vpn__header-logo">
              <img src={logo} alt="logo" />
            </div>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          {isLoggedIn && (
            <>
              <div className="user-info">
                <h5 className="u-name">Welcome, Admin! </h5>
                <div className="u-name logOut" onClick={handleLogout}>
                  Logout
                </div>
              </div>
              <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                  <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>
                  {Sidebardata.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <Outlet />
            </>
          )}
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Admin;
