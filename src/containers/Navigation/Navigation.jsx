import React from 'react';
import { Landing, Login } from '../../components';
import Home from '../Home';

/**
 * 1. If user logged in, show Home page
 * 2. If showLoginPage is true, show Login page
 * 3. If user is not logged in, show Landing page 

interface PropsIface {
  isLoggedIn?: boolean;
}
interface StateIface {
  showLoginPage: boolean;
}

 */
class Navigation extends React.Component {
  state = {
    showLoginPage: false
  };

  render() {
    let { showLoginPage } = this.state;
    let { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Home />;
    } else if (showLoginPage) {
      return <Login />;
    } else {
      return <Landing />;
    }
  }
}

export default Navigation;
