// source: https://github.com/prescottprue/react-redux-firebase/blob/master/examples/complete/material/src/routes/Login/components/LoginPage/LoginPage.js

import * as React from 'react';
import { Login as LoginComponent, Register as RegisterComponent } from '../../../components'
import { Redirect } from 'react-router';

import { connect } from 'react-redux'

import { Dimmer, Loader, Segment } from 'semantic-ui-react'

import { withFirebase } from 'react-redux-firebase'
import { withHandlers, pure, compose } from 'recompose'

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

    login (ev) {
        let { username, password } = ev
        // @TODO add redux-form to collect user credentials     
        // @TODO create a redux-mastermind to make authentication API call        
        // this.setState({ redirectToReferrer: true })
        return mastermind.update(ActionTypes.AUTHENTICATE, { username, password })
    }

    register (ev) {
        // this.setState({ redirectToReferrer: true })
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
        
        let { googleLogin, appState: { loading: { AUTHENTICATE } } } = this.props;

        console.log('[LoginContainer] props', this.props )

        if (redirectToReferrer) {
            return (<Redirect to={from}/>);
        }


        return (
            showRegisterComponent?
            <RegisterComponent
                onGoToLogin={e => this.goToLogin(e)}
                onSubmitRegister={e => this.register(e)}
            />:
            <div>
                {AUTHENTICATE && <Dimmer active >
                    <Loader >Loading...</Loader>
                </Dimmer>}
                <LoginComponent 
                onGoToRegister={e => this.goToRegister(e)}                
                onSubmitLogin={e => this.login(e)}
                onGoogleLogin={googleLogin}
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
// export default connect(mapStateToProps)(LoginContainer)
// export default LoginContainer;


export default compose(
    connect(mapStateToProps),
    UserIsNotAuthenticatedRedir, // redirect to projects page if already authenticated
    // withNotifications, // add props.showError
    withFirebase, // add props.firebase
    withHandlers({
      onSubmitFail: props => (formErrs, dispatch, err) => alert(err.message || 'Error'),
      googleLogin: ({ firebase, showError }) => event =>
        firebase
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
        }),
      emailLogin: ({ firebase, showError }) => creds =>
        firebase.login(creds).catch(err => showError(err.message))
    }),
    pure
)(LoginContainer)