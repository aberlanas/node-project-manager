import React from "react";
import Profile from "../Profile/Profile";
import "./Home.css";
import icon from "../../img/icon.png";

const Home = ({ logOutUser, user }) => {

    return (
        <div className="home">
            <div className="homeTitle">
                <div className="profileIcon"><img src={icon}/></div>
                <div className="profileTitle">FCT Project Manager</div>
                <div className = "profileHome">
                    <Profile logOutUser={logOutUser} user={user} />
                </div>
            </div>

            <div classname="homeNav">
                    NAV
            </div>
            <div classname="homeBody">
                    BOdy
            </div>
            <div classname="homeFooter">
                    Footer
            </div>

        </div>
    );
}

export default Home;