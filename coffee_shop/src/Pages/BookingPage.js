import React, {useState, } from 'react';
import Calendar from "react-calendar"
import "./BookingPage.scss";
import expandArrow from "../icons/icons8-expand-arrow.png"

const BookingPage = () => {
    const today = new Date()
    const [date, setDate] = useState(new Date());
    const [display, setDisplay] = useState({"display": "none"})
    const months = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"}

    const show = () =>{
        setDisplay({"display":"block"})
    }

    const hide = (date) =>{
        setDisplay({"display": "none"})
        setDate(date)
    }

    return(
        <div className="Booking">
            <h1>Booking</h1>
            <form>
                <div>Name:</div>
                <input type="text" name="name"/>
                <div>Tel number: </div>
                <input type="text" name="phone"/>
                <div>Number of Guest: </div>
                <input type="number" name="guests"/>
                <div>Date:</div>
                <div id="date" onClick={show}>
                    {/* default today */}
                    {date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate()} 
                    <img src={expandArrow} alt="expand arrow"/>
                </div> 
                <div style={display}>
                    <Calendar 
                      onChange={hide} 
                      minDate={today} 
                      value={date} 
                      locale="en"
                    />
                </div>
                <br/>
                <button type="submit" id="submit_btn">Reserve a table</button>
            </form>
        </div>
    )
}

export default BookingPage;