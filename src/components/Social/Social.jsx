import React from 'react'
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table,
} from 'semantic-ui-react'

import { FeedSummary, MiniMenu, MyFeed } from '.'


const Social = () => (
  <React.Fragment>
    <Grid.Column width={9}>
      <MyFeed />
    </Grid.Column>
    <Grid.Column width={4} >
      <FeedSummary />
    </Grid.Column>
  </React.Fragment>
)
export default Social
