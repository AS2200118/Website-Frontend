import React from "react";
import Logo from "../Images/RestaurantLogo.jpg";

function NavBar() {
    return (
        <div className="navbar">
            <div className="leftside">
                <img src={Logo} />
            </div>
            <div className="rightside"></div>
        </div>
    );
}

export default NavBar;