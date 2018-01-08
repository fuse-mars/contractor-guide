import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, Feed, Form, Item, Message, TextArea, Comment, Header, Input } from 'semantic-ui-react'

import './Guides.css';

class Guides extends React.Component {
    render() {
        let { guides } = this.props

        const events = Object.keys(guides||{}).map(key => {
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
            <Feed className="largeFeed" events={events} />
        )
    }
}

export default Guides;
