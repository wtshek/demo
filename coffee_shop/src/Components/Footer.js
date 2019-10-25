import React from "react";
import {Link} from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <section className="contactInfo">
                <h4>Coffee Shop</h4>
                <div>
                    <div id="email">info@coffeeShop.com</div>
                    <div id="phone">+49 123452533</div>
                </div>
            </section>
            <section className="links">
                <Link to="/"><div>Home</div></Link>
                <Link to="/Menu"><div>Menu</div></Link>
                <Link to="/Booking"><div>Booking</div></Link>
                <Link to="/Karrier"><div>Karrier</div></Link>
                <Link to="/FindUs"> <div>Find Us</div></Link>
            </section>
        </div>
    )
}

export default Footer;