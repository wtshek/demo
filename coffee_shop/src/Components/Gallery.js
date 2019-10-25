import React, { useEffect, useState, createRef} from 'react';
import TimelineMax from "gsap/TimelineMax"
import "./Gallery.scss"

import coffeeTgt from "../photos/coffeeTgt.jpg"
import shops_envir from "../photos/shops_envir.jpg"
import smile from "../photos/smile.jpg"

const Gallery = () => {
    const coveRef = createRef();
    useEffect(()=>{
        const tl = new TimelineMax()
        const timeline = ()=>{
            tl.set(coveRef.current, {marginLeft:"-100vw"}, "+=2")
            .set(coveRef.current, {marginLeft:"-200vw"}, "+=3")
            .set(coveRef.current, {marginLeft:"0vw"}, "+=4")
            .invalidate()
        }
        timeline()
    const interval = setInterval(()=>{timeline()}, 6000)
    return () => {clearInterval(interval)}
        
    },[coveRef])

    return(
        <div className="Gallery">
            <div id="animeCover" ref={coveRef} style={{marginLeft:"0vw"}}>
                <div className="slide">
                    <img id="img1" src={coffeeTgt} alt={coffeeTgt}/>
                </div>
                <div className="slide">
                    <img id="img2" src={shops_envir} alt={shops_envir}/>
                </div>
                <div className="slide">
                    <img id="img3" src={smile} alt={smile}/>
                </div>
            </div>
        </div>
    )
}

export default Gallery