import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <div className="headerContainer">
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