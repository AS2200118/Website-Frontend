import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../Images/BannerImage.webp"
import "../CSSstyle/Home.css"

function Home() {
    return (
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
            <div className="headerContainer">
                <h1> Reserve-Now </h1>
                <p> RESERVE YOUR FAVOURITE RESTAURANT </p>
                <Link to="/menu">
                    <Button> CHECK MENU </Button>
                </Link>
            </div>
        </div>
    );
}

export default Home