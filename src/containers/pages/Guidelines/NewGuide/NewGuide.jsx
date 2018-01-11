import React from 'react'
import firebase from 'firebase'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { withFirebase } from 'react-redux-firebase'

import { Redirect } from 'react-router'

import { history } from '../../../../redux'

import { NewGuide as NewGuideComponent } from '../../../../components'

/**
 * interface Props {
 * }
 */
class NewGuide extends React.Component {

    saveNewGuide(newGuide) { // newGuide = { description }
        
        let { auth, firebase } = this.props
        let { uid } = auth

        let createdAt = firebase.database.ServerValue.TIMESTAMP
        let updatedAt = firebase.database.ServerValue.TIMESTAMP
        newGuide = { ...newGuide, createdAt, updatedAt, editMode: true }

        return firebase.push(`${auth.uid}/guides`, newGuide)
        .then(({ key }) => {
            console.log('[NewGuide.saveNewGuide] res', key)
            history.replace(`/guides/${uid}/${key}`)
        })
        .catch(e => {
            console.error('[NewGuide.saveNewGuide] e', e)
            // @TODO show a notification error         
        })
    }

    render() {

        return (
            <NewGuideComponent onSubmit={values => this.saveNewGuide(values)} />            
        );

    }
}


const mapStateToProps = ({ firebase: { auth }, appState, data }) => {
    return {
      appState: appState.toJS(),
      auth,
      data: data.toJS(),
    }
}

export default compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
)(NewGuide)
// export default NewGuide;
