import React from 'react';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react'

import { Guide as GuideComponent } from '../../../../components'


/**
 * interface Props {
 * }
 */
class Guide extends React.Component {
    state = {
        showLoginPage: false
    }

    render() {

        return (
            <React.Fragment>
                <Grid.Column width={13}>
                    <GuideComponent />
                </Grid.Column>
            </React.Fragment>
        );

    }
}

export default Guide;
