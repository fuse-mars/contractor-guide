import React from 'react';
import { Grid, Button, Card, Image } from 'semantic-ui-react'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { firebaseConnect, getVal, withFirebase } from 'react-redux-firebase'

import { Guides as GuidesComponent } from '../../../../components'

/**
 * interface Props {
 * }
 */
class Favorites extends React.Component {
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
    firebaseConnect(({ auth }) => [{ path: `${auth.uid}/public` }]),
    // published = { path: '${auth.uid}/guides/<guideId>', author: { name }, authorId, ...guide }
    connect(({ firebase }, { auth }) => {

        let isAuthor = false        

        let data
        if(auth.uid) data = firebase.data[auth.uid]

        let guides = {}
        if(data) guides = data['public']


        Object.keys(guides).forEach(key => { // @TODO refactor: use Immutablejs
            let guide = guides[key]
            return guides[key] = { ...guide, isAuthor }
        })

        console.log('[Guides => connect] guides', guides)

        return { guides }

    })
)(Favorites)
// export default Favorites;
