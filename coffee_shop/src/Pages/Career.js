import React, {createRef, useState, useEffect} from 'react';
import {useMediaQuery} from "react-responsive"
import TweenMax from 'gsap/TweenMax';
import "./Career.scss";


const Career = () => {
    const baristaRef = createRef();
    const bakerRef = createRef();
    const waiterRef = createRef();
    const chefRef = createRef()
    const [visibility, setVisibility] = useState({"barista":"hidden", "baker":"hidden", "waiter":"hidden", "chef":"hidden"});
    const isMobileTablet = useMediaQuery({query:"(max-width:1023px)"})

    const slideDownAni = (ref, key) => {
        setVisibility({...visibility,
            [key]:"visible"
        })
        TweenMax.to(ref.current, 0.5, {"height": "100%"})
    }

    const slideUpAni = (ref, key) => {
        TweenMax.to(ref.current, 0.5, {"height": "0px", onComplete:()=>{setVisibility({...visibility,[key]:"hidden"})}})
    }

    useEffect(()=>{
        console.log(isMobileTablet)
        if(isMobileTablet){
            setVisibility({"barista":"visible", "baker":"visible", "waiter":"visible", "chef":"visible"})
        } else{
            setVisibility({"barista":"hidden", "baker":"hidden", "waiter":"hidden", "chef":"hidden"})
        }
    },[isMobileTablet, setVisibility])

    return(
        <div className="CareerPage">
            <div className="cover">
                <div>Career</div>
            </div>
            <h2>Are you...</h2>
            <div className="positions">
                <div 
                  className="position" 
                  id="barista" 
                  onMouseEnter={()=>slideDownAni(baristaRef, "barista")}
                  onMouseLeave={()=>slideUpAni(baristaRef, "barista")}
                  >
                    <div ref={baristaRef} className="characteristics" style={{"backgroundColor":"rgba(38, 184, 130, 0.7)", "visibility":visibility.barista}}>
                        <div />
                        passionate to coffee <br/>
                        detail-minded <br/>
                        friendly <br/>
                        art lover <br/>
                    </div>
                </div>
                <div 
                    className="position" 
                    id="baker"
                    onMouseEnter={()=>slideDownAni(bakerRef, "baker")}
                    onMouseLeave={()=>slideUpAni(bakerRef, "baker")}
                >
                    <div ref={bakerRef} className="characteristics" style={{"backgroundColor":"rgb(186, 72, 71, 0.7)", "visibility":visibility.baker}}>
                        <div />
                        passionate to bread and sweets<br/>
                        detail-minded <br/>
                        friendly <br/>
                        art lover <br/>
                    </div>
                </div>
                <div 
                    className="position" 
                    id="waiter"
                    onMouseEnter={()=>slideDownAni(waiterRef, "waiter")}
                    onMouseLeave={()=>slideUpAni(waiterRef, "waiter")}>
                    <div ref={waiterRef} className="characteristics" style={{"backgroundColor":"rgb(224, 216, 31, 0.7)", "visibility":visibility.waiter}}>
                        <div />
                        careful <br/>
                        detail-minded <br/>
                        friendly <br/>
                        art lover <br/>
                    </div>
                </div>
                <div 
                    className="position" 
                    id="chef"
                    onMouseEnter={()=>slideDownAni(chefRef, "chef")}
                    onMouseLeave={()=>slideUpAni(chefRef, "chef")}
                >
                    <div ref={chefRef} className="characteristics" style={{"backgroundColor":"rgb(69, 68, 197, 0.7)", "visibility":visibility.chef}}>
                        <div />
                        passionate to food <br/>
                        detail-minded <br/>
                        friendly <br/>
                        art lover <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Career;