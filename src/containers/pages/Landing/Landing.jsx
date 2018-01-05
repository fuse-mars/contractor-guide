import React from 'react';
import { Landing as LandingComponent } from '../../../components'
import { Redirect } from 'react-router';

import { connect } from 'react-redux'

/**
 * interface Props {
 *   showLoginPage: (ev) => void
 * }
 */
class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoginPage: false
        }
    }
    goToLoginPage(ev) {
        this.setState({ showLoginPage: true })
    }

    render() {

        return (
            <LandingComponent />            
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
export default connect(mapStateToProps)(Landing)
// export default Landing;
