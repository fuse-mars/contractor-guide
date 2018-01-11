import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Card, Image, Icon, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css'

const THEIRGuide = ({ uid, guideId, guide = {}, reportGuide, favorGuide, unFavorGuide }) => (
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

export const PublishedGuideActions = ({ uid, guideId, reportGuide, favorGuide }) => (
    <div className='ui three mini buttons basic'>
        <Button onClick={reportGuide}>Report</Button>
        <Button onClick={favorGuide} icon labelPosition='right'>Favorite<Icon name='bookmark outline' /></Button>
        <Button as={Link} to={'/guides/'+uid+'/'+guideId} icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export const FavoredGuideActions = ({ uid, guideId, reportGuide, unFavorGuide }) => (
    <div className='ui three mini buttons basic'>
        <Button onClick={reportGuide}>Report</Button>
        <Button onClick={unFavorGuide} icon labelPosition='right'><span style={{ color: '#21ba45' }}>Favorite</span><Icon name='bookmark' color='green' /></Button>        
        <Button as={Link} to={'/guides/'+uid+'/'+guideId} icon labelPosition='right'>View<Icon name='right arrow' /></Button>                                
    </div>
)

export default THEIRGuide;
