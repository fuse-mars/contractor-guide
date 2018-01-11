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

    reportGuide(guideId) { // report as non appropriate
        debugger
    }
    unFavorGuide(guideId) { // remove from my favorites
        let { auth, guides, firebase } = this.props
        let guide = guides[guideId]
        let { authorId } = guide

        return firebase.remove(`${auth.uid}/public/${guideId}`)



        // START Transaction: increment favorites count
        .then(e => firebase.ref(`${authorId}/guides/${guideId}/favoritesCount`).once('value'))
        .then(snap => firebase.update(`${authorId}/guides/${guideId}`, { favoritesCount: ((snap.val()||0)-1) }))
        // END Transaction: increment favorites count



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
                        unFavorGuide={guideId => this.unFavorGuide(guideId)}
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
    firebaseConnect((props) => {
        return Object.values(props.favoriteGuides).filter(g=>g.path).map(guide => {
            let {path} = guide
            return { type: 'once', path }
        })
    }),

    connect(({ firebase }, { auth, favoriteGuides }) => {

        // let isAuthor = false        
        let isPublic = true
        let favored = true

        let guides = {}

        Object.keys(favoriteGuides).forEach(guideId => { // @TODO refactor: use Immutablejs
            let meta = favoriteGuides[guideId]
            let { authorId, author } = meta
            console.log('[Public => connect] authorId', authorId, firebase.data[authorId])
            
            let guide = ((firebase.data[authorId]||{})['guides']||{})[guideId]

            // let { authorId } = guide
            let isAuthor = auth.uid === authorId

            return guides[guideId] = { ...guide, author, isAuthor, public: isPublic, favored }
        })

        console.log('[Guides => connect] guides', guides)

        return { guides }

    })

/*
    connect(({ firebase }, { auth }) => {

        let isAuthor = false        
        let isPublic = true
        let favored = true

        let data
        if(auth.uid) data = firebase.data[auth.uid]

        let guides = {}
        if(data) guides = data['public']


        Object.keys(guides || {}).forEach(key => { // @TODO refactor: use Immutablejs
            let guide = guides[key]
            return guides[key] = { ...guide, isAuthor, public: isPublic, favored }
        })

        console.log('[Guides => connect] guides', guides)

        return { guides }

    })
*/
)(Favorites)
// export default Favorites;
