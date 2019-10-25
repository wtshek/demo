import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePages";
import MenuPage from "./Pages/MenuPage";
import BookingPage from "./Pages/BookingPage";
import FindUsPage from "./Pages/FindUsPage";
import CareerPage from './Pages/Career'
import './App.css';


const App = () => {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/Menu" component={MenuPage} />
          <Route path="/Booking" component={BookingPage} />
          <Route path="/FindUs" component={FindUsPage} />
          <Route path="/Career" component={CareerPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
