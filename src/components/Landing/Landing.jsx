import React from 'react';
import { Link } from 'react-router-dom'

import './Landing.css';

/**
 * interface Props {
 * }
 */
class Landing extends React.Component {
    render() {
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
                    <Link to='/login' className="ui huge primary button">Sign In</Link>
                </div>

            </div>
        );
    }
}

export default Landing;
