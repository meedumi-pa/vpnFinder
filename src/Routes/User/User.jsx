import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sidebardata2 } from "../../Components/SidebarData/Sidebardata2";
import "../../apps.css";
import { IconContext } from "react-icons";
import logo from "../../assets/vpnLogo_1.png";
import axios from "axios";

const User = ({ isLoggedIn, handleLogout }) => {
  const [sidebar, setSidebar] = React.useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <IconContext.Provider value={{ color: "undefined" }}>
      <div className="user">
        <div className="navbar">
          <h1>Vpn Finder</h1>
          <div className="Vpn__header-logo">
            <img src={logo} alt="logo" />
          </div>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <div className="user-info">
          <h5 className="u-name">Welcome, User!</h5>
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
            {Sidebardata2.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Outlet />
      </div>
    </IconContext.Provider>
  );
};

export default User;
