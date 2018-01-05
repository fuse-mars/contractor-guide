import * as React from 'react';
import { Redirect } from 'react-router';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

import { connect } from 'react-redux'

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
        let { appState: { loading: { UNAUTHENTICATE } } } = this.props;

        return (
            <div>
                {UNAUTHENTICATE && <Dimmer active >
                    <Loader >Loading...</Loader>
                </Dimmer>}
            </div>       
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
export default connect(mapStateToProps)(LogoutContainer)
// export default LogoutContainer;
