import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Route, Router, Redirect, Switch } from 'react-router';

import { ConnectedRouter, push } from 'react-router-redux'

import { mastermind, history } from '../../redux'

import './App.css';
import { Navigation } from '../Navigation';

export default () => (
  <Provider store={mastermind.store}>
    <ConnectedRouter history={history}>
      <Route component={Navigation} />
    </ConnectedRouter>
  </Provider>
)