import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Card, Image, Icon, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css'

const THEIRGuides = ({ guide = {} }) => (
                <Card fluid>
                <Card.Content>
                    <Image floated='right' size='mini' src={require('../../../assets/images/avatar/small/helen.jpg')} />
                    <Card.Header>
                        { (guide.author || {}).name || 'Anonymous' }
                    </Card.Header>
                    <Card.Meta>
                        <Moment>{guide.createdAt}</Moment>
                    </Card.Meta>
                    <Card.Description>
                        {guide.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <div className="ui two column grid">
                    <div className="row">
                        <div className='column'>
                            {/* <a>
                                <Icon name='like' /> 22 likes
                            </a> */}
                        </div>
            
                        <div className='column'>

                            { guide.saved? <SavedGuideActions /> : <PublishedGuideActions /> }

                        </div>
                    </div>
                </div>
                </Card.Content>
              </Card>
            )
        




export const PublishedGuideActions = () => (
    <div className='ui three mini buttons'>
        <Button basic color='red'>Report</Button>
        <Button basic color='green' icon labelPosition='right'>Save<Icon name='bookmark' /></Button>
        <Button basic color='teal' icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export const SavedGuideActions = () => (
    <div className='ui two mini buttons'>
        <Button basic color='orange'>Remove</Button>
        <Button basic color='teal' icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export default THEIRGuides;
