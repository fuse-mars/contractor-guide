import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

/**
 * interface PropsIFace {
 *  collectionCount,
 *  guidesCount,
 *  draftsCount,
 * }
 */
export default props => (
  <Menu size='small' vertical fluid="true">
      <Menu.Item as={NavLink} to='/public' name='public'>
        <Label>{props.sharedCount}</Label>
        Public
      </Menu.Item>

      <Menu.Item as={NavLink} to='/favorites' name='favorites'>
        <Label color='teal'>{props.collectionCount}</Label>
        Favorites
      </Menu.Item>

      <Menu.Item as={NavLink} to='/guides' name='guides'>
        <Label>{props.guidesCount}</Label>
        Guides
      </Menu.Item>
  </Menu>
);