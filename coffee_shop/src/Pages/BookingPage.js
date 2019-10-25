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
                <div>Time:</div>
                <select>
                    <option>09:00 - 10:00</option>
                    <option>10:00 - 11:00</option>
                    <option>11:00 - 12:00</option>
                    <option>12:00 - 13:00</option>
                    <option>13:00 - 14:00</option>
                    <option>14:00 - 15:00</option>
                    <option>16:00 - 17:00</option>
                    <option>17:00 - 18:00</option>
                    <option>18:00 - 19:00</option>
                    <option>19:00 - 20:00</option>
                </select>
                <br/>
                <button type="submit" id="submit_btn">Find a table</button>
            </form>
        </div>
    )
}

export default BookingPage;