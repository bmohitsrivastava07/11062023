import React from 'react';

import './App.css';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { HomePage } from './Layouts/HomePage/HomePage';

function App() {
  return (
    <>
    <Navbar/>
    <HomePage/>
    <Footer/>
    
    </>
  );
}

export default App;
