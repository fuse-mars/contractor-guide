import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux'

import { Home, Landing, Login, Logout, Guidelines, NewGuide, Guide } from '../pages';

/**
 * 1. If user logged in, show Home page
 * 2. If showLoginPage is true, show Login page
 * 3. If user is not logged in, show Landing page 

interface PropsIface {
  isLoggedIn?: boolean;
}

 */
const Navigation = (props) => {
    console.log('[Navigation] props', props)
    let { isLoggedIn } = props;
    return (
        <Switch>
          <HomeRoute exact path='/' component={Home} isLoggedIn={isLoggedIn} {...props} />          
          <PublicRoute exact path='/landing' component={Landing} isLoggedIn={isLoggedIn} />
          <PublicRoute exact path='/login' component={Login} isLoggedIn={isLoggedIn} />
          <HomeRoute exact path='/logout' component={Logout} isLoggedIn={isLoggedIn} {...props} />
          <PrivateRoute component={Home} isLoggedIn={isLoggedIn} {...props} />
        </Switch>
    )

  }

const HomeRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log('[HomeRoute] isLoggedIn', isLoggedIn)
  return (
  <Route {...rest} render={props => (
    isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to='/landing'/>
    )
  )}/>
)}

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

const PublicRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log('[PublicRoute] isLoggedIn', isLoggedIn)  
  return (
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
)}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.toJS().auth.isLoggedIn,
    appState: state.appState.toJS(),
    auth: state.auth.toJS(),
    data: state.data.toJS(),
  }
}
export default connect(mapStateToProps)(Navigation)
// export default Navigation
