import * as React from 'react';
import './Register.css';

import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        let { onSubmitRegister, onGoToLogin } = this.props
        return (<div className="login ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <Link to="/">
                            <Image src={require('../../assets/images/logo.svg')} />
                        </Link>
                        <div className="content"> Account Access </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="email" placeholder="E-mail address" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Confirm" />
                                </div>
                            </div>
                            <div onClick={onSubmitRegister} className="ui fluid large teal submit button">Register</div>
                        </div>

                        <div className="ui error message"></div>

                    </form>

                    <div className="ui message">
                        Coming back? <a onClick={onGoToLogin} href="#">Login</a>
                    </div>
                </div>
            </div>);
    }
}

export default Landing;
