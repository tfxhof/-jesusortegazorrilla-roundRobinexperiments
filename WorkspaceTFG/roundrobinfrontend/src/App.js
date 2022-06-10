import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, CreateExperiment } from "./components";
//import { AppBar } from '@mui/material';
//import Appbar from './components/Appbar';
import SignUp from './components/SignUp';
import CenterHome from './components/CenterHome';
import ExperimentOverview from './components/ExperimentOverview';
import AddParticipant from './components/AddParticipant';
import AddSample from './components/AddSample';
import AddTest from './components/AddTest';

import { ExpContext } from './providers/ExperimentContext';
import { CenterContext } from './providers/CenterContext';




function App() {

  const [expName, setExpName] = useState(null);
  const [centerEmail, setCenterEmail] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <ExpContext.Provider value={{ expName, setExpName }}>
        <CenterContext.Provider value={{ centerEmail, setCenterEmail }}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CenterHome" element={<CenterHome />} />
            <Route path="/ExperimentOverview" element={<ExperimentOverview />} />
            <Route path="/CreateExperiment" element={<CreateExperiment />} />
            <Route path="/AddParticipant" element={<AddParticipant />} />
            <Route path="/AddSample" element={<AddSample />} />
            <Route path="/AddTest" element={<AddTest />} />

          </Routes>
          </CenterContext.Provider>
        </ExpContext.Provider>
        <Footer />
      </div>
    </Router>



  );
}

export default App;
