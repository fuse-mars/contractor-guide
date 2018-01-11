import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Card, Image, Icon, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css';

import MYGuide from './MYGuide'
import THEIRGuide from './THEIRGuide'

const Guides = props => {
    let { guides, unPublishGuide, deleteGuide, publishGuide, favorGuide, unFavorGuide, reportGuide } = props

    let keys = Object.keys(guides||{})
    const events = keys.map(key => {
        let guide = guides[key]
        let { authorId } = guide

        return (
            guide.isAuthor? 
            <MYGuide
                uid={authorId} guide={guide} guideId={key} key={key}
                deleteGuide={() => deleteGuide(key)}                    
                unPublishGuide={() => unPublishGuide(key)}
                publishGuide={() => publishGuide(key)}                    
            />:
            <THEIRGuide
                uid={authorId} guide={guide} guideId={key} key={key}
                reportGuide={() => reportGuide(key)} // save to my favorites
                favorGuide={() => favorGuide(key)} // save to my favorites
                unFavorGuide={() => unFavorGuide(key)} // remove from my favorites
            />
        )
    })

    return (
        keys.length?
        <Card.Group className="largeFeed" style={{padding: '0.5em'}}>{events}</Card.Group>:
        <div className="largeFeed">Oops you do not have any guides, please <Link to="/guides/new">create one!</Link></div>
    )
}

export default Guides;
