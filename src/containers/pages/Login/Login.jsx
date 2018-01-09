// source: https://github.com/prescottprue/react-redux-firebase/blob/master/examples/complete/material/src/routes/Login/components/LoginPage/LoginPage.js

import * as React from 'react';
import { Login as LoginComponent, Register as RegisterComponent } from '../../../components'
import { Redirect } from 'react-router';

import { compose } from 'redux'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { Dimmer, Loader, Segment } from 'semantic-ui-react'

import { withFirebase } from 'react-redux-firebase'

import { UserIsNotAuthenticatedRedir } from '../../../utils/router'
import { SIGNUP_PATH } from '../../../utils/constants'

import { mastermind, ActionTypes } from '../../../redux'


/**
 * interface StateIFace {
 *    redirectToReferrer: boolean;
 *    showRegisterComponent: boolean;
 * }
 */
class LoginContainer extends React.Component {
    state = {
        redirectToReferrer: false,
        showRegisterComponent: false,
    }

    googleLogin(event) {
        let { firebase } = this.props;
    return firebase
      .login({ provider: 'google', type: 'popup' })
      .then(res => {
        let auth = mastermind.getState().firebase.auth
        // console.log('[LoginContainer] googleLogin.then', res);
        console.log('[LoginContainer] mastermind.state.FS', auth);
        mastermind.update(ActionTypes.CREATE_AUTHENTICATE, auth)
      })
    .catch(err => {
        // @TODO  showError(err.message)
        console.log('[LoginContainer] googleLogin.catch', err);
    })
}
  emailLogin(creds) {
      let { firebase, showError } = this.props;
      
    firebase.login(creds).catch(err => showError(err.message))
}


    login (values) {
        let { firebase } = this.props;        
        let { email, password } = values
        // let { username, password } = values
        // @TODO return mastermind.update(ActionTypes.AUTHENTICATE, { username, password })

        return firebase
        .login({ email, password })
        .then(res => {
          let auth = mastermind.getState().firebase.auth
          mastermind.update(ActionTypes.CREATE_AUTHENTICATE, auth)
        })
      .catch(err => {
          // @TODO  showError(err.message)
          console.log('[LoginContainer] googleLogin.catch', err);
          throw new SubmissionError({ ...err, _error: err.message || 'Login failed!' })
      })
    }

    register (values) {
        let { firebase } = this.props;        
        let { email, password } = values
        let username = email.split('@')[0]

        // let { username, password } = values
        // @TODO return mastermind.update(ActionTypes.AUTHENTICATE, { username, password })

        return firebase
        .createUser({ email, password }, { username, email })
        .then(res => {
          let auth = mastermind.getState().firebase.auth
          mastermind.update(ActionTypes.CREATE_AUTHENTICATE, auth)
        })
      .catch(err => {
          // @TODO  showError(err.message)
          console.log('[LoginContainer] googleLogin.catch', err);
          throw new SubmissionError({ ...err, _error: err.message || 'Register failed!' })          
      })
    }
    goToLogin (ev) {
        this.setState({ showRegisterComponent: false })
    }
    goToRegister (ev) {
        this.setState({ showRegisterComponent: true })
    }


    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer, showRegisterComponent } = this.state
        
        let { appState: { loading: { AUTHENTICATE } } } = this.props;

        console.log('[LoginContainer] props', this.props )

        if (redirectToReferrer) {
            return (<Redirect to={from}/>);
        }

        return (
            showRegisterComponent?
            <RegisterComponent
                onGoToLogin={e => this.goToLogin(e)}
                onSubmit={values => this.register(values)}
            />:
            <div>
                {AUTHENTICATE && <Dimmer active >
                    <Loader >Loading...</Loader>
                </Dimmer>}
                <LoginComponent 
                onGoToRegister={e => this.goToRegister(e)}                
                onSubmit={values => this.login(values)}
                onGoogleLogin={e => this.googleLogin(e)}
            /></div>          
        );

    }
}

const mapStateToProps = state => {
    return {
      appState: state.appState.toJS(),
      auth: state.auth.toJS(),
      data: state.data.toJS(),
    }
}



export default compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
)(LoginContainer)
// export default connect(mapStateToProps)(LoginContainer)
// export default LoginContainer;