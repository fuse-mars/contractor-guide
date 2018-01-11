import React from 'react';

import { connect } from 'react-redux'


import { Main } from './Main';
import { NavBar } from '../../../components';

// Menu Items
const leftItems = [
  { as: 'a', content: 'Home', key: 'home', icon: 'home', url: '/'},
  { as: 'a', content: 'New Guide', key: 'form', icon: 'write', url: '/guides/new' }
];
const rightItems = [
  { as: 'a', content: 'Logout', key: 'logout', url: '/logout' },
];

const Home = () => (
    <NavBar id="topFixedNavBar" leftItems={leftItems} rightItems={rightItems}>
        <Main />
    </NavBar>
);

export default Home;