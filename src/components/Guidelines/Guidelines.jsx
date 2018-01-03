import * as React from 'react';
import './Guidelines.css';
import {
    Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table,
  } from 'semantic-ui-react'
  
class Guidelines extends React.Component {
    render() {
        return (    
            <React.Fragment>
                <Grid.Column width={13}>
                    TODO {this.props.domain}
                </Grid.Column>
            </React.Fragment>
        );
    }
}

export default Guidelines;
