import React from 'react';
import { Redirect } from 'react-router'
import { Grid } from 'semantic-ui-react'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { reset } from 'redux-form'

import { firebaseConnect, getVal, withFirebase } from 'react-redux-firebase'

import { mastermind } from '../../../../redux'
import { Guide as GuideComponent } from '../../../../components'


export const PublicGuide = compose(
    connect(mapStateToProps),
    withFirebase, // add props.firebase
    firebaseConnect(({ auth, params }) => [{ path: `${params.uid}/guides/${params.guideId}` }]),
    connect(({ firebase }, { auth, params: { guideId } }) => {
        
        let data
        if(auth.uid) data = firebase.data[auth.uid]
        
        let guides
        if(data) guides = data['guides']

        let guide = {}
        if(guides) guide = guides[guideId]
        console.log('[Guide => connect] guide', guide)

        // return { guide: getVal(firebase, `${auth.uid}/guides/${params.guideId}`) }
        return { guide, guideId }
    })
)(Guide)
// export default Guide;
