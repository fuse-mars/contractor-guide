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
        let { auth, firebase } = this.props

        return firebase.remove(`${auth.uid}/public/${guideId}`)
        .catch(e => {
            debugger
        })
    }
    favorGuide(guideId) { // save to my favorites
        
        let { auth, guides, firebase } = this.props
        let guide = guides[guideId]

        return firebase.update(`${auth.uid}/public/${guideId}`, guide)
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
    withFirebase, // add props.firebase
    firebaseConnect(({ auth }) => [
        { path: `public` },
        { path: `${auth.uid}/public` },
    ]),
    // public = { path: '${auth.uid}/guides/<guideId>', author, authorId, ...guide }
    connect(({ firebase }, { auth }) => {
        
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

        console.log('[Guides => connect] guides', guides)

        return { guides }

    })
)(Public)
// export default Guides;
