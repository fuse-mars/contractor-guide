import * as React from 'react';
import Moment from 'react-moment';

import { Button, Dropdown, Feed, Form, Item, Message, TextArea, Comment, Header, Input, Icon } from 'semantic-ui-react'
import { Card, Image } from 'semantic-ui-react'

import { Field, reduxForm } from 'redux-form'

import MYGuide from './MYGuide'
import THEIRGuide from './THEIRGuide'

import './Guide.css';

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

const contentTypeOptions = [
    { key: 1, text: 'Text', value: 'TEXT' },
    { key: 2, text: 'Image', value: 'IMAGE' },
    { key: 3, text: 'Video', value: 'VIDEO' },
];

const NewStep = ({ handleSubmit }) => (
    <Form onSubmit={handleSubmit} success>
        <Field name="contentType" component={semanticFormField} as={Dropdown} fluid selection options={contentTypeOptions}  placeholder='Text' />
        <Field name="content" component={semanticFormField} as={Form.Field} control={TextArea} placeholder='Add a step here...' />
        <Button icon labelPosition='left' ><Icon name='add' />add</Button>
    </Form>
)

const NewGuideStep = reduxForm({
    form: 'NewGuideStepForm', // a unique identifier for this form
})(NewStep)

/**
 * 
 * @param { steps: Map<string, Step<{}>> } props 
 */
const GuideSteps = props => {
    
    let { steps = {}, onSubmit } = props

    let keys = Object.keys(steps)
    let nextKey = keys.length + 1
    let items = keys.map(key => {
        let { order = key, content } = steps[key]
        return (
            <Item key={key}>
                <Item.Image size='tiny' src={require('../../../assets/images/wireframe/image-text.png')} />
                <Item.Content verticalAlign='middle'>

                    <Item.Description>
                        <p>Step {order}</p>
                        <p>
                        {content}
                        </p>
                    </Item.Description>

                </Item.Content>
            </Item>
        )
    })

    return (
        <Item.Group divided>
            {items}
            <Item>
                <Item.Image size='tiny' src={require('../../../assets/images/wireframe/image-text.png')} />
                <Item.Content verticalAlign='middle'>
                    <Item.Description>
                        <p>Step {nextKey}</p>
                        <NewGuideStep onSubmit={step => onSubmit({...step, order: nextKey })} />
                    </Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}


const GuideSummary = ({ guide }) => {
    return (

        <React.Fragment>
            <Image floated='right' size='mini' src={(guide.author || {}).picture} />
            <Card.Header>
                { (guide.author || {}).name || 'Anonymous' }
            </Card.Header>
            <Card.Meta>
                <Moment>{guide.createdAt}</Moment>
            </Card.Meta>
            <Card.Description>
                {guide.description}
            </Card.Description>
        </React.Fragment>
        
    )
}

const Guide = ({ guide = {}, editMode, toogleEditMode, onSubmit, guideId, unPublishGuide, deleteGuide, publishGuide, favorGuide, unFavorGuide, reportGuide }) => {
        return (
            guide.isAuthor? 
            <MYGuide
                uid={guide.authorId} guide={guide} guideId={guideId}
                editMode={editMode} onSubmit={onSubmit} toogleEditMode={toogleEditMode}
                deleteGuide={() => deleteGuide(guideId)}                    
                unPublishGuide={() => unPublishGuide(guideId)}
                publishGuide={() => publishGuide(guideId)}                    
            />:
            <THEIRGuide
                uid={guide.authorId} guide={guide} guideId={guideId}
                reportGuide={() => reportGuide(guideId)} // save to my favorites
                favorGuide={() => favorGuide(guideId)} // save to my favorites
                unFavorGuide={() => unFavorGuide(guideId)} // remove from my favorites
            />
        )
    }

export default Guide;
