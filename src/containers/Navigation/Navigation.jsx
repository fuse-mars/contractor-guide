import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Landing, Login } from '../index';
import { Home } from '../Home';

/**
 * 1. If user logged in, show Home page
 * 2. If showLoginPage is true, show Login page
 * 3. If user is not logged in, show Landing page 

interface PropsIface {
  isLoggedIn?: boolean;
}

 */
class Navigation extends React.Component {

  render() {
    let { isLoggedIn } = this.props;
    
    return (
      <Switch>
        <HomeRoute exact path='/' component={Home} isLoggedIn={isLoggedIn}/>          
        <PublicRoute exact path='/landing' component={Landing} isLoggedIn={isLoggedIn}/>
        <PublicRoute exact path='/login' component={Login} isLoggedIn={isLoggedIn}/>  
        <PrivateRoute component={Home} isLoggedIn={isLoggedIn}/>
      </Switch>
    )

  }
}

const HomeRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to='/landing'/>
    )
  )}/>
)

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const PublicRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    !isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default Navigation;
