import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { render } from "react-dom";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

import { SearchBarNav } from '../index'

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        items={leftItems.map( (item, i) => {
          return (item.url != "/") ? 
            <NavLink to={item.url} key={item.key || i}>
              <Menu.Item id="mobileNavItem" style={{ height: "70px" }}>
                <Icon name={item.icon} />{item.content}
              </Menu.Item>
            </NavLink> : 
            <NavLink to={item.url} key={item.key || i}>
              <Menu.Item id="mobileNavItem" style={{ height: "60px" }}> 
                <div style={{ padding: "auto" }}>
                  <Image style={{ margin: "auto", marginBottom: "3px" }} size="mini" src={require('../../assets/images/logo.svg')} />
                </div>
              </Menu.Item>
            </NavLink>
          })}
        vertical
        visible={visible}
        width="thin"
      />
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        {children}
        <Menu fixed="top" inverted>
          <Menu.Item style={{ height: "60px" }} onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item id="searchBarNav">
              <SearchBarNav />
            </Menu.Item>
            {rightItems.map((item, i) => <NavLink className="a" to={item.url} key={item.key || i}>
              <Menu.Item style={{ height: "60px" }} >{item.content}</Menu.Item>
            </NavLink>)}
          </Menu.Menu>
        </Menu>

      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item>
        <NavLink className="a" to="/"><Image size="mini" src={require('../../assets/images/logo.svg')} /></NavLink>
      </Menu.Item>
      {leftItems.map(function (item, i) {
        // On Desktop Nav the logo is the home "/" link, so I don't render it
        return (item.url != "/") ? <NavLink className="a" to={item.url} key={i}>
          <Menu.Item style={{ height: "60px" }} key={item.key}>{item.content}</Menu.Item>
        </NavLink> : null
      })}
      <Menu.Menu position="right">
        <Menu.Item id="searchBarNav">
          <SearchBarNav />
        </Menu.Item>
        {
          rightItems.map((item, i) => 
            <NavLink className="a" to={item.url} key={i}>
            <Menu.Item style={{ height: "60px" }} 
              key={item.key}>{item.content}
              </Menu.Item></NavLink>)}
      </Menu.Menu>
    </Container>

  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container>{children}</Container>
);

class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, leftItems, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}


export default NavBar
