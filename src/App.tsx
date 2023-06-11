import React from 'react';

import './App.css';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { HomePage } from './Layouts/HomePage/HomePage';
import { SearchProductsPage } from './Layouts/SearchProductPage/SearchProductsPage';
import {Route,Routes, Navigate, useNavigate} from 'react-router-dom';
import { ProductCheckoutPage } from './Layouts/ProductCheckoutPage/ProductCheckoutPage';
import { OktaConfig } from './Lib/OktaConfig';
import {OktaAuth,toRelativeUrl} from '@okta/okta-auth-js';
import { Security,LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth =new OktaAuth(OktaConfig);
function App() {
  const customAuthHandler=()=>{
    navigate('/login');
  }
  const navigate =useNavigate();
  const restoreOriginalUri= async(_oktaAuth: any,originalUri :any)=>{
    navigate(toRelativeUrl(originalUri || '/',window.location.origin));
  };
  return (
    <div className='d-flex flex-column min-vh-100'>
<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
    <Navbar/>
<div className='flex-grow-1'>
    <Routes>
      <Route path='/' element={<Navigate to="/home" replace/>}/> 
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/search' element={<SearchProductsPage/>}/>
      <Route path='/checkout/:productId' element={<ProductCheckoutPage/>}/>
   
   </Routes>
   <Route path='/login' Component={()=> <LoginWidget config={OktaConfig}/>}/>
   <Route path='/login/callback' Component={LoginCallback}/>
   </div>
    <Footer/>
    </Security>
    </div>
  );
}

export default App;
