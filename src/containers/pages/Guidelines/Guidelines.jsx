import React from 'react';

import { Route, Switch } from 'react-router';

import { compose } from 'redux'
import { connect } from 'react-redux'

import { firebaseConnect, getVal, withFirebase } from 'react-redux-firebase'

import { Guidelines as GuidelinesComponent, MiniMenu, Social } from '../../../components'
import { Guide, Guides, Shared } from '.'

import { Grid } from 'semantic-ui-react'
  
/**
 * @Routes
 * - guides
 * - guides/guideId
 * 
 * interface Props {
 * }
 */
const Guidelines = props => (
    <Grid container doubling stackable>
        <Grid.Column width={3}>
            <MiniMenu {...props}/>
        </Grid.Column>
        <Switch>
            {/* NOTE: any component being rendered must be wrapped inside "Grid.Column" */}
            <Route exact path='/public' component={Shared} />
            <Route exact path='/collection' render={(props) => <GuidelinesComponent domain='collection' />} />
            <Route exact path='/guides/:guideId' component={Guide} />
            <Route exact path='/guides' component={Guides}/>
            <Route exact path='/drafts' render={(props) => <GuidelinesComponent domain='drafts' />} />
            <Route component={Shared}/>
        </Switch>
    </Grid>
)

// <Route render={(props) => (<Social />)} />

const mapStateToProps = ({ firebase: { auth }, appState, data }) => {
    return {
        appState: appState.toJS(),
        auth,
        data: {
            ...data.toJS(),
            collectionCount: 0,
            guidesCount: 0,
            draftsCount: 0,
            sharedCount: 0,
        },
    }
}




export default compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
    firebaseConnect(({ auth, params }) => [
        { path: `${auth.uid}/guides` },
        { path: `${auth.uid}/collection` },
        { path: `${auth.uid}/drafts` },
    ]),
    connect(({ firebase }, { data: {
        collectionCount,
        guidesCount,
        draftsCount,
        sharedCount,
    }, auth, params }) => {

        let data
        if(auth.uid) data = firebase.data[auth.uid]
        
        if(data) collectionCount = Object.keys(data['collection']||{}).length
        if(data) guidesCount = Object.keys(data['guides']||{}).length
        if(data) draftsCount = Object.keys(data['drafts']||{}).length

        // return { guide: getVal(firebase, `${auth.uid}/guides/${params.guideId}`) }
        return { 
            collectionCount,
            guidesCount,
            draftsCount,
            sharedCount,
        }
    })
)(Guidelines)


// export default compose(
//     connect(mapStateToProps),
//     withFirebase, // add props.firebase
// )(Guidelines)
// export default Guidelines;
