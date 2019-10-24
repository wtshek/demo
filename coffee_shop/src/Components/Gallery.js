import React, {useRef, createRef, useEffect} from 'react';
import {TimelineMax} from "gsap";
import "./Gallery.scss"

import coffeeTgt from "../photos/coffeeTgt.jpg"
import shops_envir from "../photos/shops_envir.jpg"
import smile from "../photos/smile.jpg"

const Gallery = () => {
    const imgRefs = useRef([createRef(), createRef(), createRef()])

    useEffect(()=>{
        let slideIndex = 0;
        const slideShow = () => {
            for (let i = 0; i<imgRefs.current.length; i++){
                imgRefs.current[i].current.style.display = "none"
            }
            slideIndex++;
            if(slideIndex > imgRefs.current.length-1) {slideIndex = 0}
            imgRefs.current[slideIndex].current.style.display="block";
            setTimeout(slideShow, 2000)
        }
        slideShow()
    })
    return(
        <div className="Gallery">
            <div id="animeCover">
                <img ref={imgRefs.current[0]} src={coffeeTgt} alt={coffeeTgt}/>
                <img ref={imgRefs.current[1]} src={shops_envir} alt={shops_envir}/>
                <img ref={imgRefs.current[2]} src={smile} alt={smile}/>
            </div>
        </div>
    )
}

export default Gallery