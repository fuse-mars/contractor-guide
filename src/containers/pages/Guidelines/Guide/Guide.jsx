import React from 'react';
import { Redirect } from 'react-router'
import { Grid } from 'semantic-ui-react'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import { firebaseConnect, getVal, withFirebase } from 'react-redux-firebase'

import { mastermind } from '../../../../redux'
import { Guide as GuideComponent } from '../../../../components'

const ReduxFromNames = {
    NEW_GUIDE_STEP: 'NewGuideStepForm'
}

/**
 * interface Props {
 * }
 */
class Guide extends React.Component {
    toogleEditMode() {
        // let editMode = !this.state.editMode
        let { auth, firebase, guideId } = this.props
        
        // START Transaction: increment favorites count
        firebase.ref(`${auth.uid}/guides/${guideId}/editMode`).once('value')
        .then(snap => firebase.update(`${auth.uid}/guides/${guideId}`, { editMode: !snap.val() }))
        // END Transaction: increment favorites count

    }

    /**
     * 
     * @param { contentType, content } step 
     */
    addNewStep(step) {

        let { auth, firebase, guideId } = this.props

        let createdAt = firebase.database.ServerValue.TIMESTAMP
        let updatedAt = firebase.database.ServerValue.TIMESTAMP
        step = { ...step, createdAt, updatedAt }

        return firebase.push(`${auth.uid}/guides/${guideId}/steps`, step)
        .then(({ key }) => {
            console.log('[Guide.addNewStep] res', key)
            // @TODO create instructions for this
            mastermind.store.dispatch(reset(ReduxFromNames.NEW_GUIDE_STEP))
        })
        .catch(e => {
            console.error('[Guide.addNewStep] e', e)
            // @TODO show a notification error         
        })
    }

    render() {
        let { guide } = this.props
        // let { editMode } = this.state
        // if(guide.editMode === true) editMode = guide.editMode
        return (
            <React.Fragment>
                <Grid.Column width={13}>
                    <GuideComponent guide={guide} editMode={guide.editMode} toogleEditMode={() => this.toogleEditMode()} onSubmit={step => this.addNewStep(step)} />
                </Grid.Column>
            </React.Fragment>
        );

    }
}

const mapStateToProps = ({ firebase: { auth }, appState, data }, ownProps) => {
    return {
        ...ownProps.match, // add props.params
        appState: appState.toJS(),
        auth,
        data: {
            ...data.toJS(),
            guide: {}, // @TODO change to Immutable.Map
        },
    }
}

export default compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
    firebaseConnect(({ auth, params }) => [{ 
        path: `${params.authorId}/guides/${params.guideId}`,
    },{
        path: `auth/${params.authorId}`,        
    }]),
    connect(({ firebase }, { auth, params: { authorId, guideId } }) => {
        
        // START 
        let userData = (firebase.data['auth']||{})[authorId]||{}
        let name = userData['displayName']
        let picture = userData['avatarUrl']
        // START 


        let data = firebase.data[authorId]
        
        let guides
        if(data) guides = data['guides']

        let guide = {}
        if(guides) guide = guides[guideId]
        console.log('[Guide => connect] guide', guide)
        
        let isAuthor = auth.uid === authorId
        let author = { name, picture }
        guide = { ...guide, author, isAuthor, authorId }

        // return { guide: getVal(firebase, `${auth.uid}/guides/${params.guideId}`) }
        return { guide, guideId }
    })
)(Guide)
// export default Guide;
