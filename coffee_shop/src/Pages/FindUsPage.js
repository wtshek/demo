import React from 'react';
import GoogleMapReact from 'google-map-react'
import "./FindUsPage.scss"
import mappin from "../icons/map-pin.png"

const Marker = (props) => {
    return <div><img src={mappin} alt="mappin" /></div>
}

// TODOS: 
const ContactPage = () => {
    const place = {lat: 48.461030 , lng: 7.946220}

    return(
        <div className="FindUs">
            <h1>Find Us</h1>
            <div className="info">
                <div>Coffee Shop</div>
                <div>Opening Time: 09:00 - 21:00 Mon-Sun</div>
                <div>Tel: +49 123452533</div>
                <div>Email: info@coffeeShop.com</div>
                <div>Address: <br/>Sankt Martin Straße, <br/>77652 Offenburg, Deutschland</div>
                <div id="map">
                    <GoogleMapReact 
                        bootstrapURLKeys={{
                            // remember: change the url in the api
                            key: "AIzaSyDOMCPajnAbMu1mSQg5YzTM-IUCfptEdlk", 
                            language: 'en'
                        }}
                        defaultCenter={place}
                        defaultZoom={15}
                    >
                        <Marker lat={place.lat} lng={place.lng} />
                    </GoogleMapReact>
                </div>
            </div>
        </div>
    )
}

export default ContactPage