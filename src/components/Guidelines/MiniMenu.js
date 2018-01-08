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
      <Menu.Item as={NavLink} to='/collection' name='collection'>
        <Label color='teal'>{props.collectionCount}</Label>
        Collection
      </Menu.Item>

      <Menu.Item as={NavLink} to='/guides' name='guides'>
        <Label>{props.guidesCount}</Label>
        Guides
      </Menu.Item>

    <Menu.Item as={NavLink} to='/drafts' name='drafts'>
      <Label>{props.draftsCount}</Label>
      Drafts
    </Menu.Item>
    <Menu.Item>
      <Input icon='search' placeholder='Search guides...' />
    </Menu.Item>
  </Menu>
);
