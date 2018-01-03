import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import { Navigation } from '../Navigation';

import testRedux from '../../redux/index.test'

class App extends Component {
  render() {
    return (<Navigation isLoggedIn={false} />);
  }
}

export default App;
