import React from 'react';
import { Landing as LandingComponent } from '../../../components'
import { Redirect } from 'react-router';

/**
 * interface Props {
 *   showLoginPage: (ev) => void
 * }
 */
class Landing extends React.Component {
    state = {
        showLoginPage: false
    }
    goToLoginPage(ev) {
        this.setState({ showLoginPage: true })
    }

    render() {

        const { showLoginPage } = this.state
        return (
            showLoginPage?
            <Redirect to="/login"/>:
            <LandingComponent goToLoginPage={e => this.goToLoginPage(e)}/>            
        );

    }
}

export default Landing;
