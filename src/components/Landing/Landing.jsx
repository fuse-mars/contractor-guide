import React from 'react';
import './Landing.css';

/**
 * interface Props {
 *   showLoginPage: (ev) => void
 * }
 */
class Landing extends React.Component {
    render() {
        let { goToLoginPage } = this.props
        return (
            <div className="ui inverted vertical masthead center aligned segment">
                <div className="ui text container">
                    <h1 className="ui inverted header">
                        Contractor's Guide
                    </h1>
                    <h2>
                        A list of things to know/do in order to easily start
                        their contract work in a new office environment.
                    </h2>
                    <button onClick={goToLoginPage} className="ui huge primary button">Sign In</button>
                </div>

            </div>
        );
    }
}

export default Landing;
