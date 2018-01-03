import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'

export default class MenuExampleSizeVerticalMini extends Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='small' vertical fluid="true">
        <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
          <Label color='teal'>12</Label>
          Collection
        </Menu.Item>

        <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
          <Label>0</Label>
          Guides
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
          <Label>0</Label>
          Drafts
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search guides...' />
        </Menu.Item>
      </Menu>
    )
  }
}
