import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const events = [{
  date: 'Mars shared a guide 1 Hour Ago',
  image: `${require('../../assets/images/avatar/small/joe.jpg')}`,
  meta:  {content: "1 Like", like: {icon: "like"}},
  summary: 'How to get an Employee ID Card',
}, {
  date: 'Doreen created a guide 4 days ago',
  image: `${require('../../assets/images/avatar/small/helen.jpg')}`,
  meta:  {content: "17 Likes", like: {icon: "like"}},
  summary: 'How to keep the kitchen clean!',
  extraImages: [
    `${require('../../assets/images/wireframe/image.png')}`,
    `${require('../../assets/images/wireframe/image-text.png')}`
  ],
}, {
  date: 'Joyce posted a guide a week ago',
  image: `${require('../../assets/images/avatar/small/molly.png')}`,
  meta:  {content: "8 Likes", like: {icon: "like"}},
  summary: 'How to get an Employee ID Card',
  extraText: <ol><li>Ask Joyce to put in request</li><li>...</li></ol>,
}, {
  date: 'Greg created a group 2 months ago',
  image: `${require('../../assets/images/avatar/small/elliot.jpg')}`,
  meta: {content: "41 Likes", like: {icon: "like"}},
  summary: 'IBM Contractors',
  extraImages: [
    `${require('../../assets/images/wireframe/image-text.png')}`
  ],
}, {
  date: 'Joyce created a guide a year ago',
  image: `${require('../../assets/images/avatar/small/molly.png')}`,
  meta:  {content: "8 Likes", like: {icon: "like"}},
  summary: 'How to get an Employee ID Card',
  extraText: <ol><li>Ask Joyce to put in request</li><li>...</li></ol>
}]

const MyFeed = () => <Feed id="largeFeed" events={events} />

export default MyFeed
