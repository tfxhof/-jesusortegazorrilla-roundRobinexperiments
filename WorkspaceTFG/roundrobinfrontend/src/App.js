import './App.css';
import React from 'react';
//import Appbar from './components/Appbar';
import ResearchCenter from './components/ResearchCenter';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home } from "./components";
//import { AppBar } from '@mui/material';

function App() {
  return (
    <div className="App">

      <Router>
          <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/researchCenters" element={<ResearchCenter />} />
        </Routes>
      </Router>
      <Footer />

    </div>
  );
}

export default App;
