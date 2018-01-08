import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css';

class Guides extends React.Component {
    render() {
        let { guides } = this.props

        let keys = Object.keys(guides||{})
        const events =         keys.map(key => {
            let guide = guides[key]

            return {
                as: Link,
                to: `/guides/${key}`,
                date: <Moment>{guide.createdAt}</Moment>,
                image: require('../../../assets/images/avatar/small/helen.jpg'),
                meta:  { content: "0 Likes", like: { icon: "like" } },
                summary: guide.description,
            }
        })
        return (
            keys.length? 
            <Feed className="largeFeed" events={events} />:
            <div className="largeFeed">Oops you do not have any guides, please <Link to="/guides/new">create one!</Link></div>
        )
    }
}

export default Guides;
