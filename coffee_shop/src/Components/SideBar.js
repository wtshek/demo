import React, {useEffect, createRef} from 'react';
import {TweenLite} from "gsap";
import cancel from "../icons/icons8-cancel.svg"
import "./SideBar.scss"

const SideBar = ({childList, setIsHidden, isHidden, btList}) => {
    const sideBarRef = createRef();

    const handleLinkClick = () =>{
        setIsHidden(true)
    }
    
    useEffect(()=>{
        //open
        if(!isHidden){
            TweenLite.fromTo(sideBarRef.current, 0.5, {x: 100, y:0}, {x:0, y:0})
        }
        //close
        if(isHidden){
            TweenLite.fromTo(sideBarRef.current, 0.5, {x: 0, y:0}, {x: 100, y:0})
        }
    }, [isHidden, sideBarRef])

    return(
        <div className="SideBar" ref={sideBarRef}>
            <div className="SideBar-cancel" onClick={()=>{setIsHidden(true)}}>
                <img src={cancel} alt={cancel} />
            </div>
            <div className="SideBar-items">
                {childList(btList, handleLinkClick)}
            </div>
        </div>
    )
}

export default SideBar