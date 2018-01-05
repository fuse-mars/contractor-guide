import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Route, Router, Redirect, Switch } from 'react-router';

import { mastermind } from '../../redux'

import './App.css';
import { Navigation } from '../Navigation';

export default () => (
  <Provider store={mastermind.store}>
    <HashRouter>
      <Route component={Navigation} />
    </HashRouter>
  </Provider>
)