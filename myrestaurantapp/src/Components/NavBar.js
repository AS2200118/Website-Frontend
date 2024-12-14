import React from "react";
import Logo from "../Images/RestaurantLogo.jpg";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="navbar">
            <div className="leftside">
                <img src={Logo} />
            </div>
            <div className="rightside">
                <Link to="/"> Home</Link>
                <Link to="/menu"> Menu</Link>
                <Link to="/reservation"> Reservation</Link>
                <Link to="/login"> Login</Link>
                <Link to="/register"> Register</Link>
            </div>
        </div>
    );
}

export default NavBar;