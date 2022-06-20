import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, CreateExperiment, MeasurementOverview } from "./components";
//import { AppBar } from '@mui/material';
//import Appbar from './components/Appbar';
import SignUp from './components/SignUp';
import CenterHome from './components/CenterHome';
import ExperimentOverview from './components/ExperimentOverview';
import AddParticipant from './components/AddParticipant';
import AddSample from './components/AddSample';
import AddMeasure from './components/AddMeasure';
import ParticipantOverview from './components/ParticipantOverview';
import AddPersonalInfo from './components/AddPersonalInfo';
import AddInstrument from './components/AddInstrument';
import AddResult from './components/AddResult';
import Auxiliar from './components/Auxiliar';
import SignUpParticipant from './components/SignUpParticipant';

import { ExpContextProvider } from './providers/ExperimentContext';
import { CenterContextProvider } from './providers/CenterContext';
import ConfirmParticipant from './components/ConfirmParticipant';


function App() {

  const [expName, setExpName] = useState(null);
  const [centerEmail, setCenterEmail] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* The provider gives access  to the context to the consumers inside */}
        <ExpContextProvider>
        <CenterContextProvider>
        
        <Navigation />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CenterHome" element={<CenterHome />} />
            <Route path="/ExperimentOverview" element={<ExperimentOverview />} />
            <Route path="/CreateExperiment" element={<CreateExperiment />} />
            <Route path="/AddParticipant" element={<AddParticipant />} />
            <Route path="/AddSample" element={<AddSample />} />
            <Route path="/AddMeasure" element={<AddMeasure />} />
            <Route path="/ParticipantOverview" element={<ParticipantOverview />} />
            <Route path="/AddPersonalInfo" element={<AddPersonalInfo />} />
            <Route path="/AddInstrument" element={<AddInstrument />} />
            <Route path="/AddResult" element={<AddResult />} />
            <Route path="/MeasurementOverview" element={<MeasurementOverview />} />
            <Route path="/Auxiliar" element={<Auxiliar />} />
            <Route path="/SignUpParticipant" element={<SignUpParticipant />} />
            <Route path="/ConfirmParticipant" element={<ConfirmParticipant/>} />

          </Routes>

          </CenterContextProvider>
        </ExpContextProvider>
        <Footer />
      </div>
    </Router>

  );
}

export default App;
