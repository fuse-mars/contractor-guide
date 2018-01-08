import * as React from 'react';

import { Field, reduxForm } from 'redux-form'
import { Button, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'


import './NewGuide.css';




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



const NewGuide = props => {
    const { onGoToRegister, onGoogleLogin, handleSubmit, pristine, reset, submitting } = props

    return (
        <Form onSubmit={handleSubmit} success>
        
            <Field name="description" component={semanticFormField} as={Form.Field} control={TextArea} label='Guide' placeholder="How to get something done..." />

            <Message info content="You will be able to add steps after submission" />
            <Button type="submit">Submit</Button>                
        </Form>
    )
}


export default reduxForm({
    form: 'NewGuideForm', // a unique identifier for this form
})(NewGuide)
// export default NewGuide;