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
class Public extends React.Component {
    reportGuide(guideId) { // report as non appropriate
        debugger
    }
    unFavorGuide(guideId) { // remove from my favorites
        let { auth, guides, firebase } = this.props
        let guide = guides[guideId]
        let { authorId } = guide

        firebase.remove(`${auth.uid}/public/${guideId}`)

        // START Transaction: increment favorites count
        .then(e => firebase.ref(`${authorId}/guides/${guideId}/favoritesCount`).once('value'))
        .then(snap => firebase.update(`${authorId}/guides/${guideId}`, { favoritesCount: ((snap.val()||0)-1) }))
        // END Transaction: increment favorites count


        .catch(e => {
            debugger
        })
    }
    favorGuide(guideId) { // save to my favorites
        
        let { auth, guides, firebase } = this.props
        let guide = guides[guideId]
        
        let { authorId } = guide

        return firebase.update(`${auth.uid}/public/${guideId}`, guide)
        
        // START Transaction: increment favorites count
        .then(e => firebase.ref(`${authorId}/guides/${guideId}/favoritesCount`).once('value'))
        .then(snap => firebase.update(`${authorId}/guides/${guideId}`, { favoritesCount: ((snap.val()||0)+1) }))
        // END Transaction: increment favorites count

        .catch(e => {
            debugger            
        })
    }

    unPublishGuide(guideId) { // @TODO duplicated "../Guides/Guides"
        let { auth, firebase } = this.props
        
        firebase.update(`${auth.uid}/guides/${guideId}`, { public: false })
        .then(() => firebase.remove(`public/${guideId}`))
        .catch(e => {
            debugger            
        })

    }

    render() {
        let { guides } = this.props
        console.log('[Guides] guides', guides)

        return (
            <React.Fragment>
                <Grid.Column width={13}>
                    <GuidesComponent guides={guides}
                        reportGuide={guideId => this.reportGuide(guideId)}
                        favorGuide={guideId => this.favorGuide(guideId)}
                        unFavorGuide={guideId => this.unFavorGuide(guideId)}
                        unPublishGuide={guideId => this.unPublishGuide(guideId)}
                    />
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
    // public = { path: '${auth.uid}/guides/<guideId>', author, authorId, ...guide }
    firebaseConnect((props) => {
        return Object.values(props.publicGuides).map(guide => {
            let { path } = guide
            return { path }
        })
    }),


    /**
     * @TODO fix your logic:
     * current logic:
     * 1. fetch path list from firebase "public" collection
     * 2. loop through the path list and make request to the firebase "<path>" collection
     * => Problem: Too many netowork requests
     * => cause: we wanted to figure out the best way to increment/decrement/show favoritesCount
     */
    connect(({ firebase }, { auth, publicGuides }) => {
        
        // START very inefficient: fetching all favored things may crush the browser
        let data = firebase.data[auth.uid]
        let favoriteGuides = {}
        if(data) favoriteGuides = data['public']
        // END very inefficient


        let guides = {}
        let isPublic = true

        Object.keys(publicGuides).forEach(guideId => { // @TODO refactor: use Immutablejs
            let meta = publicGuides[guideId]
            let { authorId, author } = meta
            console.log('[Public => connect] authorId', authorId, firebase.data[authorId])
            
            let guide = ((firebase.data[authorId]||{})['guides']||{})[guideId]

            // let { authorId } = guide
            let isAuthor = auth.uid === authorId

            // @TODO START very inefficient: 
            let favored = !!(favoriteGuides||{})[guideId]
            // END very inefficient

            return guides[guideId] = { ...guide, author, isAuthor, authorId, public: isPublic, favored }
        })
        console.log('[Public => connect] uid', guides)

        return { guides }

    })



/*
    connect(({ firebase }, { auth }) => {
        console.log('[Public => connect] uid', auth.uid)
        
        // START very inefficient: fetching all favored things may crush the browser
        let data = firebase.data[auth.uid]
        let favoriteGuides = {}
        if(data) favoriteGuides = data['public']
        // END very inefficient


        let guides = firebase.data['public']
        let isPublic = true

        Object.keys(guides||{}).forEach(key => { // @TODO refactor: use Immutablejs
            let guide = guides[key]

            let { authorId } = guide
            let isAuthor = auth.uid === authorId

            // @TODO START very inefficient: 
            let favored = !!(favoriteGuides||{})[key]
            // END very inefficient

            return guides[key] = { ...guide, isAuthor, public: isPublic, favored }
        })

        return { guides }

    })
*/



)(Public)
// export default Guides;
