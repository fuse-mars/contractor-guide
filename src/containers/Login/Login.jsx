import * as React from 'react';
import { Login as LoginComponent } from '../../components'
import { Register as RegisterComponent } from '../../components'
import { Redirect } from 'react-router';

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
        // @TODO add redux-form to collect user credentials     
        // @TODO create a redux-matermind to make authentication API call        
        // this.setState({ redirectToReferrer: true })
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
        
        if (redirectToReferrer) {
            return (<Redirect to={from}/>);
        }

        return (
            showRegisterComponent?
            <RegisterComponent
                onGoToLogin={e => this.goToLogin(e)}
                onSubmitRegister={e => this.register(e)}
            />:
            <LoginComponent 
                onGoToRegister={e => this.goToRegister(e)}                
                onSubmitLogin={e => this.login(e)}
            />            
        );

    }
}

export default LoginContainer;
