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
    
    publishGuide(guideId) {
        let { auth, firebase, guides, profile } = this.props
        let { displayName: name, avatarUrl :picture } = profile

        let authorId = auth.uid
        let author = { name, picture }

        let { description, createdAt, updatedAt } = { ...guides[guideId] } // clone
        let guide = { description, createdAt, updatedAt }
        
        firebase.update(`${auth.uid}/guides/${guideId}`, { public: true })
        .then(() => firebase.update(`public/${guideId}`, 
            { 
                path: `${auth.uid}/guides/${guideId}`,
                author,
                authorId,
                ...guide,
            })
        )
        .catch(e => {
            debugger
        })
    }
    unPublishGuide(guideId) { // @TODO duplicated "../Favorites/Favorites"
        let { auth, firebase } = this.props
        
        firebase.update(`${auth.uid}/guides/${guideId}`, { public: false })
        .then(() => firebase.remove(`public/${guideId}`))
        .catch(e => {
            debugger            
        })

    }

    deleteGuide(guideId) {
        let { auth, firebase } = this.props        
        firebase.remove(`${auth.uid}/guides/${guideId}`)
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
                    <GuidesComponent 
                        guides={guides}
                        unPublishGuide={e => this.unPublishGuide(e)}
                        deleteGuide={e => this.deleteGuide(e)}
                        publishGuide={guideId => this.publishGuide(guideId)}
                    />
                </Grid.Column>
            </React.Fragment>
        );

    }
}

const mapStateToProps = ({ firebase: { auth, profile }, appState, data }) => {
    return {
        appState: appState.toJS(),
        auth,
        profile, // required by the publish action
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
    connect(({ firebase }, { auth, profile }) => {
        
        let isAuthor = true
        let authorId = auth.uid

        let data
        if(auth.uid) data = firebase.data[auth.uid]

        let guides = {}
        if(data) guides = data['guides']


        Object.keys(guides).forEach(key => { // @TODO refactor: use Immutablejs
            let guide = guides[key]
            let name = profile.displayName
            let picture = profile.avatarUrl
            let author = { ...profile, name, picture }
            return guides[key] = { ...guide, author, authorId, isAuthor }
        })

        console.log('[Guides => connect] profile', profile)

        return { guides }
    })
)(Guides)
// export default Guides;
