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
    saveGuide(guideId) { // save to my favorites
        debugger
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
                        saveGuide={guideId => this.saveGuide(guideId)}
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
    firebaseConnect(({ auth }) => [{ path: `public` }]),
    // public = { path: '${auth.uid}/guides/<guideId>', author, authorId, ...guide }
    connect(({ firebase }, { auth }) => {

        let guides = firebase.data['public']
        let isPublic = true

        Object.keys(guides||{}).forEach(key => { // @TODO refactor: use Immutablejs
            let guide = guides[key]

            let { authorId } = guide
            let isAuthor = auth.uid === authorId
            
            return guides[key] = { ...guide, isAuthor, public: isPublic }
        })

        console.log('[Guides => connect] guides', guides)

        return { guides }

    })
)(Public)
// export default Guides;
