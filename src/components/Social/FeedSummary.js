import React from 'react'
import { Card, Feed } from 'semantic-ui-react'

const FeedSummary = () => (
  <Card fluid="true">
    <Card.Content>
      <Card.Header>
        Recent Activity
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Label image={require('../../assets/images/avatar/small/molly.png')}/>
          <Feed.Content>
            <Feed.Date content='a week ago' />
            <Feed.Summary>
              <a>Joyce</a> posted a <a>guide</a> to <a>IBM Contractors</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image={require('../../assets/images/avatar/small/elliot.jpg')} />
          <Feed.Content>
            <Feed.Date content='3 weeks ago' />
            <Feed.Summary>
            <a>Greg</a> added <a>you</a> as a friend.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image={require('../../assets/images/avatar/small/elliot.jpg')} />
          <Feed.Content>
            <Feed.Date content='a month ago' />
            <Feed.Summary>
            <a>Greg</a> added <a>Jonny</a> to <a>IBM Contractors</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
)

export default FeedSummary
