import React from 'react';
import { Guidelines as GuidelinesComponent } from '../../components'
import { Redirect } from 'react-router';

/**
 * interface Props {
 *   showLoginPage: (ev) => void
 * }
 */
class Guidelines extends React.Component {
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
            <GuidelinesComponent goToLoginPage={e => this.goToLoginPage(e)}/>            
        );

    }
}

export default Guidelines;
