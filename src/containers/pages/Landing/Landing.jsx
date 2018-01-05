import React from 'react';
import { Landing as LandingComponent } from '../../../components'
import { Redirect } from 'react-router';

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

export default Landing;
