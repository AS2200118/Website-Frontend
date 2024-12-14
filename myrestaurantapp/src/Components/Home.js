import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../Images/BannerImage.webp"

function Home() {
    return (
        <div className="home">
            <div className="headerContainer" style={{ backgroundImage: `url(${BannerImage})` }}>
                <h1> Reserve-Now </h1>
                <p> RESERVE YOUR FAVOURITE RESTAURANT </p>
                <Link to="/menu">
                    <Button> CHECK OUR MENU </Button>
                </Link>
            </div>
        </div>
    );
}

export default Home