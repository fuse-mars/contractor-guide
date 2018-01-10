import React from 'react';

import { Route, Switch } from 'react-router';

import { compose } from 'redux'
import { connect } from 'react-redux'

import { firebaseConnect, getVal, withFirebase } from 'react-redux-firebase'

import { Guidelines as GuidelinesComponent, MiniMenu, Social } from '../../../components'
import { Guide, Guides, Public, Favorites } from '.'

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
            <Route exact path='/public' component={Public} />
            <Route exact path='/favorites' component={Favorites} />
            <Route exact path='/guides/:authorId/:guideId' component={Guide} />
            <Route exact path='/guides/:guideId' component={Guide} />
            <Route exact path='/guides' component={Guides}/>
            <Route component={Public}/>
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
            favoritesCount: 0,
            guidesCount: 0,
            draftsCount: 0,
            publicCount: 0,
        },
    }
}

export default compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
    firebaseConnect(({ auth, params }) => [
        { path: `${auth.uid}/guides` },
        { path: `public` },
        { path: `${auth.uid}/public` },
    ]),
    connect(({ firebase }, { data: {
        publicCount,
        favoritesCount,
        guidesCount,
    }, auth, params }) => {

        publicCount = Object.keys(firebase.data['public']||{}).length
        
        let data
        if(auth.uid) data = firebase.data[auth.uid]
        
        if(data) guidesCount = Object.keys(data['guides']||{}).length
        if(data) favoritesCount = Object.keys(data['public']||{}).length

        console.log('[Guidelines] count', { publicCount, favoritesCount, guidesCount } )

        return { 
            publicCount,
            favoritesCount,
            guidesCount,
        }
    })
)(Guidelines)


// export default compose(
//     connect(mapStateToProps),
//     withFirebase, // add props.firebase
// )(Guidelines)
// export default Guidelines;
