import React from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar";
import './App.css';

// TODOS: find photos
// Component: Menu and Footer, Pages according to menu
// rolling gallery, coffee, food, environment, music, animal_friendly


const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />

      </Router>
    </div>
  )
}

export default App;
