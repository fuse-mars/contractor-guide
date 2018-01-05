import * as React from 'react';
import { Redirect } from 'react-router';

import { mastermind, ActionTypes } from '../../../redux'


/**
 * interface StateIFace {
 *    redirectToReferrer: boolean;
 *    showRegisterComponent: boolean;
 * }
 */
class LogoutContainer extends React.Component {

    componentDidMount () {
        // @TODO add redux-form to collect user credentials     
        // @TODO create a redux-mastermind to make authentication API call        
        // this.setState({ redirectToReferrer: true })
        return mastermind.update(ActionTypes.UNAUTHENTICATE)
    }

    render() {

        return (
            <div>Loggin out ...</div>       
        );

    }
}

export default LogoutContainer;
