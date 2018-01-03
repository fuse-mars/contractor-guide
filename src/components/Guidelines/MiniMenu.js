import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

export default () => (
  <Menu size='small' vertical fluid="true">
      <Menu.Item as={NavLink} to='/collection' name='collection'>
        <Label color='teal'>12</Label>
        Collection
      </Menu.Item>

      <Menu.Item as={NavLink} to='/guides' name='guides'>
        <Label>0</Label>
        Guides
      </Menu.Item>

    <Menu.Item as={NavLink} to='/drafts' name='drafts'>
      <Label>0</Label>
      Drafts
    </Menu.Item>
    <Menu.Item>
      <Input icon='search' placeholder='Search guides...' />
    </Menu.Item>
  </Menu>
);
