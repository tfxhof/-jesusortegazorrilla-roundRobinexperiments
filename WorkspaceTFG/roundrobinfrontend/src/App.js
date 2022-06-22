import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { 
  Navigation, 
  Footer, 
  Home, 
  CreateExperiment, 
  ParticipantMeasureOverview, 
  ParticipantMeasurementOverview, 
  AddParameter, 
  CreatorMeasureOverview, 
  CreatorMeasurementOverview } from "./components";
  

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
import SignUpParticipant from './components/SignUpParticipant';

import ConfirmParticipant from './components/ConfirmParticipant';
import Results from './components/Results';
import ResultGraph from './components/ResultGraph';

import { ExpContextProvider } from './providers/ExperimentContext';
import { CenterContextProvider } from './providers/CenterContext';

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
            <Route path="/CreatorMeasureOverview" element={<CreatorMeasureOverview />} />
            <Route path="/CreatorMeasurementOverview" element={<CreatorMeasurementOverview />} />
            <Route path="/Results" element={<Results/>} />
            <Route path="/ResultGraph" element={<ResultGraph />} />


            <Route path="/ParticipantOverview" element={<ParticipantOverview />} />
            <Route path="/AddPersonalInfo" element={<AddPersonalInfo />} />
            <Route path="/AddInstrument" element={<AddInstrument />} />
            <Route path="/AddParameter" element={<AddParameter />} />
            <Route path="/AddResult" element={<AddResult />} />
            <Route path="/ParticipantMeasureOverview" element={<ParticipantMeasureOverview />} />
            <Route path="/ParticipantMeasurementOverview" element={<ParticipantMeasurementOverview />} />
            
            
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
