import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Card, Image, Icon, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css'

const THEIRGuides = ({ uid, guideId, guide = {}, reportGuide, saveGuide, removeGuide }) => (
                <Card fluid>
                <Card.Content>
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
                </Card.Content>
                <Card.Content extra>
                <div className="ui two column grid">
                    <div className="row">
                        <div className='column'>
                            <a>
                                <Icon name='like' /> 22 Favored
                            </a>
                        </div>
            
                        <div className='column'>

                            {   guide.favored? 
                                <SavedGuideActions uid={uid} guideId={guideId} reportGuide={reportGuide} saveGuide={saveGuide} /> :
                                <PublishedGuideActions uid={uid} guideId={guideId} reportGuide={reportGuide} removeGuide={removeGuide} />
                            }

                        </div>
                    </div>
                </div>
                </Card.Content>
              </Card>
            )

export const PublishedGuideActions = ({ uid, guideId, reportGuide, saveGuide }) => (
    <div className='ui three mini buttons'>
        <Button onClick={reportGuide} basic color='red'>Report</Button>
        <Button onClick={saveGuide} basic color='green' icon labelPosition='right'>Favorite<Icon name='like' /></Button>
        <Button as={Link} to={'/guides/'+uid+'/'+guideId} basic color='teal' icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export const SavedGuideActions = ({ uid, guideId, reportGuide, removeGuide }) => (
    <div className='ui two mini buttons'>
        <Button onClick={reportGuide} basic color='red'>Report</Button>
        <Button onClick={removeGuide} basic color='orange'>Remove</Button>
        <Button as={Link} to={'/guides/'+uid+'/'+guideId} basic color='teal' icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export default THEIRGuides;
