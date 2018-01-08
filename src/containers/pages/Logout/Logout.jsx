import * as React from 'react';
import { Redirect } from 'react-router';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { withFirebase } from 'react-redux-firebase'

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
        this.props.firebase.logout()
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

export default compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
)(LogoutContainer)
// export default connect(mapStateToProps)(LogoutContainer)
// export default LogoutContainer;
