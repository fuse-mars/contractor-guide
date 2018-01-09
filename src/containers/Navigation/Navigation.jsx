import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux'

import { Home, Landing, Login, Guidelines, NewGuide, Guide } from '../pages';

/**
 * 1. If user logged in, show Home page
 * 2. If showLoginPage is true, show Login page
 * 3. If user is not logged in, show Landing page
  interface PropsIface {
    isLoggedIn?: boolean;
  }
 */
const Navigation = props => {
  let { isLoggingIn, isLoggedIn } = props

    return (
        isLoggingIn?
        <div>Loading...</div>:
        <Switch>
          <HomeRoute exact path='/' component={Home} isLoggedIn={isLoggedIn} />          
          <PublicRoute exact path='/landing' component={Landing} isLoggedIn={isLoggedIn} />
          <PublicRoute exact path='/login' component={Login} isLoggedIn={isLoggedIn} />
          <PrivateRoute component={Home} isLoggedIn={isLoggedIn} />
        </Switch>
    )

  }
const HomeRoute = ({ component: Component, isLoggedIn, ...rest }) => {
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

({ firebase: { auth, profile } }) => ({
  auth,
  profile
})

const mapStateToProps = ({ firebase: { auth, profile }, appState, data }) => {
  return {
    // @TODO redesign this part because it does not conform to our state model
    isLoggedIn: !!auth.stsTokenManager,
    isLoggingIn: !auth.isLoaded,
    // isLoggedIn: state.auth.toJS().auth.isLoggedIn,
    appState: appState.toJS(),
    auth,
    // auth: auth.toJS(),
    data: data.toJS(),
  }
}

// export default compose(
//   withFirebase, // add props.firebase
//   connect(mapStateToProps),
// )(Navigation)

export default connect(mapStateToProps)(Navigation)
// export default Navigation
