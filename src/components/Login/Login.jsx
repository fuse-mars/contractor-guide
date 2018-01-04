import * as React from 'react';
import './Login.css';

import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
    render() {
        let { onSubmitLogin, onGoToRegister } = this.props
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
                            <div onClick={onSubmitLogin} className="ui fluid large teal submit button">Login</div>
                        </div>

                        <div className="ui error message"></div>

                    </form>

                    <div className="ui message">
                        New to us? <a onClick={onGoToRegister} href="#">Register</a>
                    </div>
                </div>
            </div>);
    }
}

export default Landing;
