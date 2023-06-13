
import React from 'react';
import { Route,Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { SearchProductsPage } from './Layouts/SearchProductPage/SearchProductsPage';
import { HomePage } from './Layouts/HomePage/HomePage';
import { ProductCheckoutPage } from './Layouts/ProductCheckoutPage/ProductCheckoutPage';
import { OktaConfig } from './Lib/OktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth = new OktaAuth(OktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    navigate('/login');
  }

  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar />
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/'>
            <HomePage/>
          </Route>
          <Route path='/search'>
            <SearchProductsPage />
          </Route>

          <Route path='/checkout/:productId'>
            <ProductCheckoutPage/>
          </Route>
          <Route path='/login' Component={
            () => <LoginWidget config={OktaConfig} /> 
            } 
          />
          <Route path='/login/callback' Component={LoginCallback} />
        </Routes>
      </div>
      <Footer />
      </Security>
    </div>
  );
} 
