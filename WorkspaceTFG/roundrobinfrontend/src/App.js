import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, CreateExperiment } from "./components";
//import { AppBar } from '@mui/material';
//import Appbar from './components/Appbar';
import SignUp from './components/SignUp';
import CenterHome from './components/CenterHome';
import ExperimentOverview from './components/ExperimentOverview';
import { AppContext } from './providers/ExperimentContext';


function App() {

  const [expName, setExpName] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <AppContext.Provider value={{ expName, setExpName }}>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CenterHome" element={<CenterHome />} />
            <Route path="/ExperimentOverview" element={<ExperimentOverview />} />
            <Route path="/CreateExperiment" element={<CreateExperiment />} />

          </Routes>
        </AppContext.Provider>
        <Footer />
      </div>
    </Router>



  );
}

export default App;
