import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../Images/NewRestaurantLogo.jpg";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../CSSstyle/NavBar.css";

function Navbar() {
    const navigate = useNavigate();
    const [openLinks, setOpenLinks] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleNavBar = () => {
        setOpenLinks(!openLinks);
    };

    return (
        <div className="navbar">
            <div className="leftside" id={openLinks ? "open" : "close"}>
                <img src={Logo} alt="Logo" />
                <div className="hiddenLinks">
                    <Link to="/"> Home</Link>
                    <Link to="/menu"> Menu</Link>
                    <Link to="/reservation"> Reservation</Link>
                    <Link to="/review"> Review</Link>
                    {isLoggedIn ? (
                        <>
                            <span className="user-status">Logged In</span>
                            <Link to="#" onClick={handleLogout} className="logout-link">Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login"> Login</Link>
                            <Link to="/register"> Register</Link>
                        </>
                    )}
                </div>
            </div>
            <div className="rightside">
                <Link to="/"> Home</Link>
                <Link to="/menu"> Menu</Link>
                <Link to="/reservation"> Reservation</Link>
                <Link to="/review"> Review</Link>
                {isLoggedIn ? (
                    <>
                        <span className="user-status">Logged In</span>
                        <Link to="#" onClick={handleLogout} className="logout-link">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login"> Login</Link>
                        <Link to="/register"> Register</Link>
                    </>
                )}
                <button onClick={toggleNavBar}>
                    <ReorderIcon />
                </button>
            </div>
        </div>
    );
}

export default Navbar;