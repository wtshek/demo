import React from 'react';
import "./HomePage.scss"
import Gallery from "../Components/Gallery";

import makingCoffee from "../photos/making_coffee.jpg";
import cake from "../photos/cake.jpg"
import dogs from "../photos/dogs.jpg"
import shops_envir2 from "../photos/shops_envir2.jpg"
import music from "../photos/music.jpg"

const HomePage = () =>{


    return(
        <div>
            <Gallery />
            <div className="introduction">
                <div>
                    <div className="left">
                        <img src={makingCoffee} alt={makingCoffee} />
                    </div>
                    <div className="right margin-left">
                        All of the coffee beans are fair trade marked <br/>
                        We roast them ourselve. <br/>
                        We ensure the best quality
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="left margin-right">
                        Daily changing baking goods. <br/>
                        You will find handmake bread, cake and cookies. <br/>
                        Vegan version avaliable! <br/>
                        Come and enjoy a good afternoon tea!
                    </div>
                    <div className="right">
                        <img src={cake} alt={cake} />
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="left">
                        <img src={shops_envir2} alt={shops_envir2} />
                    </div>
                    <div className="right margin-left">
                        Chill, relax and clean environment. <br/>
                        Make you feel like home. <br/>
                        A place for you and your families and friends
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="left">
                        We are a fans of music and class. <br/>
                        Music plays by Vinyl records. <br/>
                        It's time to revisit the old time. 
                    </div>
                    <div className="right">
                        <img src={music} alt={music} />
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="left">
                        <img src={dogs} alt={dogs} />
                    </div>
                    <div className="right">
                        All animal lovers are welcome. <br/>
                        We love animals, just like you do! <br/>
                        Can't wait to meet your lovely pets!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage