import './App.css';
import React from 'react';
//import Appbar from './components/Appbar';
import SignUp from './components/SignUp';
import CenterHome from './components/CenterHome';

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
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/CenterHome" element={<CenterHome />} />
        </Routes>
      </Router>
      <Footer />

    </div>
  );
}

export default App;
