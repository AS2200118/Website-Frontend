import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import "../CSSstyle/Footer.css"


function Footer() {
    return (
        <div className="footer">
            <div className="socialMedia">
                <InstagramIcon /> <FacebookIcon /> <XIcon /> <WhatsAppIcon />
            </div>
            <p> &copy; 2024 Reserve-Now.com</p>
        </div>
    );
}

export default Footer;