import React, {useState} from 'react';
import SideBar from "./SideBar";
import {Link} from "react-router-dom";
import "./Navbar.scss";
import menuIcon from "../icons/icons8-menu.svg"


const Navbar = () => {
    const btList = ["Home", "Menu", "Booking", "Karrier", "Contact Us"]
    const [isHidden, setIsHidden] = useState(true)

    const itemsList = (items, handleClick) => {
        return items.map(item => {
            return(
                <div onClick={handleClick}>
                    <Link to={`/${item}`} key={item}>{item}</Link>
                </div>
            )
        })
    }

    const toggleSideBar = () => {
        setIsHidden(false)
    }

    return(
        <nav className="Navbar">
            <div className="logo">
                <Link to={`/Home`}> Coffee Shop</Link>
            </div>
            <div className="Navbar-separator" />
            <div className="Navbar-items">
                {itemsList(btList)}
                <div className="showSideBt" onClick={toggleSideBar}>
                    <img src={menuIcon} alt={menuIcon} />
                </div>
            </div>
            {isHidden? 
                null: 
                <SideBar 
                    setIsHidden={setIsHidden}
                    isHidden={isHidden} 
                    childList={itemsList}
                    btList={btList}
                />
            }
        </nav>
    )
}

export default Navbar