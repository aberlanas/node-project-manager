import React from "react";
import Profile from "../Profile/Profile";
import "./Header.css";
import icon from "../../img/icon.png";
import Nav from "../Nav/Nav";

const Header = () => {
  return (
    <React.Fragment>
        <div className="homeTitle">
      <div className="profileIcon">
        <img alt="" src={icon} />
      </div>
      <div className="profileTitle">FCT Project Manager</div>
      <div className="profileHome">
        <Profile />
      </div>
      </div>
      <Nav />
    </React.Fragment>
  );
};

export default Header;