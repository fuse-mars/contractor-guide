import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Form, Input } from 'semantic-ui-react';

import './Login.css';

import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import GoogleButton from 'react-google-button'




function semanticFormField ({ input, type, label, placeholder, meta: { touched, error, warning }, as: As = Input, ...props }) {
    function handleChange (e, { value }) {
      return input.onChange(value);
    }
    return (
      <Form.Field>
        <As {...props} {...input} value={input.value} type={type} label={label} placeholder={placeholder} onChange={handleChange} />
        {touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}
      </Form.Field>
    );
}


const Login = props => {
    const { onGoToRegister, onGoogleLogin, handleSubmit, pristine, reset, submitting } = props

    return (<div className="login ui middle aligned center aligned grid">
            <div className="column">
                <h2 className="ui teal image header">
                    <Link to="/">
                        <Image src={require('../../assets/images/logo.svg')} />
                    </Link>
                    <div className="content"> Account Access </div>
                </h2>
                <Form onSubmit={handleSubmit} className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                        <Field name="email" component={semanticFormField} as={Form.Input} type="text" icon="user" placeholder="E-mail address" />
                        </div>
                        <div className="field">
                        <Field name="password" component={semanticFormField} as={Form.Input} type="text" icon="lock" placeholder="Password" />
                        </div>
                        <button type="submit"  disabled={pristine || submitting} className="ui fluid large teal submit button">Login</button>
                    </div>

                    <div className="ui error message"></div>

                </Form>

                <div className="ui message" style={{ paddingLeft: '6em' }}>
                    <GoogleButton onClick={onGoogleLogin} />
                </div>
                
                <div className="ui message">
                    New to us? <span onClick={onGoToRegister} className="link"> Register </span>
                </div>

            </div>
        </div>);
}


export default reduxForm({
    form: 'LoginForm', // a unique identifier for this form
})(Login)
// export default Login;
