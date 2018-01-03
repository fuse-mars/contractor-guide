import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import { Navigation } from '../Navigation';

class App extends Component {
  render() {
    return (<Navigation isLoggedIn={true} />);
  }
}

export default App;
