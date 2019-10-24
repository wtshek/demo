import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"
import HomePage from "./Pages/HomePages"
import MenuPage from "./Pages/MenuPage"
import './App.css';

// TODOS: find photos
// Component: Menu and Footer, Pages according to menu
// rolling gallery, coffee, food, environment, music, animal_friendly


const App = () => {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/Menu" component={MenuPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
