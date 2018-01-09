import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Card, Image, Icon, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css';

import MYGuides from './MYGuides'
import THEIRGuides from './THEIRGuides'

class Guides extends React.Component {
    render() {
        let { guides, unPublishGuide, deleteGuide, publishGuide } = this.props

        let keys = Object.keys(guides||{})
        const events = keys.map(key => {
            let guide = guides[key]


            return (
                guide.isAuthor? 
                <MYGuides
                    guide={guide} guideId={key} key={key}
                    unPublishGuide={e => unPublishGuide(key)} deleteGuide={e => deleteGuide(key)} publishGuide={e => publishGuide(key)}                    
                />:
                <THEIRGuides 
                    guide={guide} guideId={key} key={key}
                />
            )
        })

        return (
            keys.length?
            <Card.Group className="largeFeed" style={{padding: '0.5em'}}>{events}</Card.Group>:
            <div className="largeFeed">Oops you do not have any guides, please <Link to="/guides/new">create one!</Link></div>
        )
    }
}

export default Guides;
