import * as React from 'react';
import { Login as LoginComponent, Register as RegisterComponent } from '../../../components'
import { Redirect } from 'react-router';

import { connect } from 'react-redux'

import { Dimmer, Loader, Segment } from 'semantic-ui-react'



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
        
        let { appState: { loading: { AUTHENTICATE } } } = this.props;

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
export default connect(mapStateToProps)(LoginContainer)
// export default LoginContainer;
