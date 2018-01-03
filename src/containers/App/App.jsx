import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { Navigation } from '../Navigation';

export default () => (
  <BrowserRouter>
    <Navigation isLoggedIn={false} />
  </BrowserRouter>
)