import * as React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { Button, Dropdown, Feed, Form, Item, Message, TextArea, Comment, Header, Input, Icon } from 'semantic-ui-react'
import { Card, Image } from 'semantic-ui-react'

import { Field, reduxForm } from 'redux-form'

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
    
    let { steps = {} } = props

    let keys = Object.keys(steps)
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

const Guide = ({ uid, guideId, guide = {}, reportGuide, favorGuide, unFavorGuide }) => {
        return (
        <Card fluid>
            <Card.Content>
                <GuideSummary  guide={guide} />
            </Card.Content>
                
            <Card.Content extra>
                <GuideSteps steps={guide.steps} />
            </Card.Content>

            <Card.Content extra>

                <div className="ui two column grid">
                    <div className="row">
                        <div className='column'>
                            {guide.favoritesCount||0} Favored
                        </div>
            
                        <div className='column'>

                            {   
                                guide.favored? 
                                <FavoredGuideActions uid={uid} guideId={guideId} reportGuide={reportGuide} unFavorGuide={unFavorGuide} />:
                                <PublishedGuideActions uid={uid} guideId={guideId} reportGuide={reportGuide} favorGuide={favorGuide} unFavorGuide={unFavorGuide} />
                            }

                        </div>
                    </div>
                </div>

            </Card.Content>

        </Card>
        )
    }

    export const PublishedGuideActions = ({ uid, guideId, reportGuide, favorGuide }) => (
        <div className='ui two mini buttons basic'>
            <Button onClick={reportGuide}>Report</Button>
            <Button onClick={favorGuide} icon labelPosition='right'>Favorite<Icon name='bookmark outline' /></Button>
        </div>
    )
    
    export const FavoredGuideActions = ({ uid, guideId, reportGuide, unFavorGuide }) => (
        <div className='ui two mini buttons basic'>
            <Button onClick={reportGuide}>Report</Button>
            <Button onClick={unFavorGuide} icon labelPosition='right'><span style={{ color: '#21ba45' }}>Favorite</span><Icon name='bookmark' color='green' /></Button>        
        </div>
    )
    

export default Guide;
