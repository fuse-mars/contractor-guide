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
  { as: 'a', content: 'Logout', key: 'logout', url: 'logout' },
];

const Home = () => (
    <NavBar id="topFixedNavBar" leftItems={leftItems} rightItems={rightItems}>
        <Main />
    </NavBar>
);

const mapStateToProps = state => {
  return {
    appState: state.appState.toJS(),
    auth: state.auth.toJS(),
    data: state.data.toJS(),
  }
}
export default connect(mapStateToProps)(Home)
// export default Home;