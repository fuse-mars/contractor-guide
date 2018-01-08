import React from 'react';
import { Grid } from 'semantic-ui-react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { firebaseConnect, getVal, withFirebase } from 'react-redux-firebase'

import { Guides as GuidesComponent } from '../../../../components'


/**
 * interface Props {
 * }
 */
class Guides extends React.Component {
    state = {
        showLoginPage: false
    }

    render() {
        let { guides } = this.props
        console.log('[Guides] guides', guides)

        return (
            <React.Fragment>
                <Grid.Column width={13}>
                    <GuidesComponent guides={guides} />
                </Grid.Column>
            </React.Fragment>
        );

    }
}

const mapStateToProps = ({ firebase: { auth }, appState, data }) => {
    return {
        appState: appState.toJS(),
        auth,
        data: {
            ...data.toJS(),
            guides: {}, // @TODO change to Immutable.Map
        },
    }
}

export default compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
    firebaseConnect(({ auth }) => [{ path: `${auth.uid}/guides` }]),
    connect(({ firebase }, { auth }) => {

        let data
        if(auth.uid) data = firebase.data[auth.uid]

        console.log('[Guides => connect] guides', data)
        
        let guides = {}
        if(data) guides = data['guides']

        return { guides }
    })
)(Guides)
// export default Guides;
