import React, { useState } from "react";
import Logo from "../Images/NewRestaurantLogo.jpg";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../CSSstyle/NavBar.css"

function NavBar() {
    const [openLinks, setOpenLinks] = useState(false);
    const toggleNavBar = ()=> {
        setOpenLinks(!openLinks)
    };
    return (
        <div className="navbar">
            <div className="leftside" id={openLinks ? "open" : "close"}>
                <img src={Logo} alt="restaurant logo" />
            </div>
            <div className="rightside">
                <Link to="/"> Home</Link>
                <Link to="/menu"> Menu</Link>
                <Link to="/reservation"> Reservation</Link>
                <Link to="/login"> Login</Link>
                <Link to="/register"> Register</Link>
                <button onClick={toggleNavBar}>
                    <ReorderIcon />
                </button>
            </div>
            {openLinks && (
                <div className="hiddenLinks">
                    <Link to="/"> Home</Link>
                    <Link to="/menu"> Menu</Link>
                    <Link to="/reservation"> Reservation</Link>
                    <Link to="/login"> Login</Link>
                    <Link to="/register"> Register</Link>
                </div>
            )}
        </div>
    );
}

export default NavBar;