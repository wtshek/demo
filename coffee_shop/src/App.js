import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePages"
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
          <Route exact path="/" component={HomePage} />
        </Switch>

      </Router>
    </div>
  )
}

export default App;
