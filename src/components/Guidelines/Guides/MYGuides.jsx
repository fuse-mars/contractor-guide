import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Card, Image, Icon, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css';
// meta:  { content: "0 Likes", like: { icon: "like" } },
// summary: guide.description,
const MYGuides = ({ uid, guide = {}, guideId, unPublishGuide, deleteGuide, publishGuide }) => (
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
                            {guide.favoritesCount||0} Favored
                        </div>
            
                        <div className='column'>

                            {
                                guide.public?
                                <PublishedGuideActions uid={uid} guideId={guideId} unPublishGuide={unPublishGuide} /> :
                                <UnPublishedGuideActions uid={uid} guideId={guideId} deleteGuide={deleteGuide} publishGuide={publishGuide}/>
                            }

                        </div>
                    </div>
                </div>
                </Card.Content>
              </Card>
            )


export const PublishedGuideActions = ({ uid, guideId, unPublishGuide }) => (
    <div className='ui two mini buttons basic'>
        <Button onClick={unPublishGuide}>Unpublish</Button>
        <Button as={Link} to={'/guides/'+uid+'/'+guideId} icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export const UnPublishedGuideActions = ({ uid, guideId, deleteGuide, publishGuide }) => (
    <div className='ui three mini buttons basic'>
        <Button onClick={deleteGuide}>Delete</Button>
        <Button onClick={publishGuide} color='green'>Publish</Button>
        <Button as={Link} to={'/guides/'+uid+'/'+guideId} icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export default MYGuides;
