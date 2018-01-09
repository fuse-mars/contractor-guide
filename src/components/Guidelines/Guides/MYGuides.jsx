import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Card, Image, Icon, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css';
// meta:  { content: "0 Likes", like: { icon: "like" } },
// summary: guide.description,
const MYGuides = ({ guide = {}, guideId, unPublishGuide, deleteGuide, publishGuide }) => (
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
                                <Icon name='bookmark' /> 22 Saves
                            </a>
                        </div>
            
                        <div className='column'>

                            { guide.public? <PublishedGuideActions guideId={guideId} unPublishGuide={unPublishGuide} /> : <UnPublishedGuideActions guideId={guideId} deleteGuide={deleteGuide} publishGuide={publishGuide}/> }

                        </div>
                    </div>
                </div>
                </Card.Content>
              </Card>
            )


export const PublishedGuideActions = ({ guideId, unPublishGuide }) => (
    <div className='ui two mini buttons'>
        <Button onClick={unPublishGuide} basic color='orange'>Unpublish</Button>
        <Button as={Link} to={'/guides/'+guideId} basic color='teal' icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export const UnPublishedGuideActions = ({ guideId, deleteGuide, publishGuide }) => (
    <div className='ui three mini buttons'>
        <Button onClick={deleteGuide} basic color='red'>Delete</Button>
        <Button onClick={publishGuide} basic color='green'>Publish</Button>
        <Button as={Link} to={'/guides/'+guideId} basic color='teal' icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export default MYGuides;
