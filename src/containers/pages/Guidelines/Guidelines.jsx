import React from 'react';
import { Guidelines as GuidelinesComponent, MiniMenu, Social } from '../../../components'
import { Guide } from '.'
import { Route, Switch } from 'react-router';

import { Grid } from 'semantic-ui-react'
  
/**
 * @Routes
 * - guides
 * - guides/guideId
 * 
 * interface Props {
 * }
 */
class Guidelines extends React.Component {
    state = { activeRoute: 'root' }

    handleItemClick = (name) => this.setState({ activeItem: name })

    render() {
        let { activeItem } = this.state

        return (
            <Grid container doubling stackable>
                <Grid.Column width={3}>
                    <MiniMenu activeItem={activeItem} handleItemClick={name => this.handleItemClick(name)} />
                </Grid.Column>
                <Switch>
                    {/* NOTE: any component being rendered must be wrapped inside "Grid.Column" */}
                    <Route path='/collection' render={(props) => <GuidelinesComponent domain='collection' />} />
                    <Route path='/guides' render={(props) => <GuidelinesComponent domain='guides' />} />
                    <Route path='/guides/:guideId' component={Guide} />
                    <Route path='/drafts' render={(props) => <GuidelinesComponent domain='drafts' />} />
                    <Route render={(props) => (<Social />)} />
                </Switch>
            </Grid>
        );

    }
}

export default Guidelines;
