import * as React from 'react';
import { Link } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { Form, Input, Image } from 'semantic-ui-react';

import './Register.css';

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

const Register = props => {
        // let { onSubmitRegister, onGoToLogin } = props

        const { onGoToLogin, handleSubmit, pristine, reset, submitting } = props


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


                                <Field name="password" component={semanticFormField} as={Form.Input} type="password" icon="lock" placeholder="Password" />


                            </div>
                            <div className="field">
                           
                           

                            <Field name="confirmPassword" component={semanticFormField} as={Form.Input} type="password" icon="lock" placeholder="Confirm" />



                            </div>
                            <button type="submit" disabled={pristine || submitting} className="ui fluid large teal submit button">Register</button>
                        </div>

                        <div className="ui error message"></div>

                    </Form>

                    <div className="ui message">
                        Coming back? <span onClick={onGoToLogin} className="link" >Login</span>
                    </div>
                </div>
            </div>);
    }

export default reduxForm({
    form: 'RegisterForm', // a unique identifier for this form
})(Register)
// export default Register;
