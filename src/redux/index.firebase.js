import { compose, createStore } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

import { createMastermind } from 'redux-mastermind'

import { StateModel as initialStoreState } from './store'
import updateSchemaCreators from './instructions'

const firebaseConfig = {
  apiKey: 'AIzaSyAKKCLl9XJcpy4S2Dx8Hv1fDaj92dZ1WRU',
  authDomain: 'guide-2e394.firebaseapp.com',
  databaseURL: 'https://guide-2e394.firebaseio.com',
  storageBucket: 'guide-2e394.appspot.com'
}
// initialize firebase instance
firebase.initializeApp(firebaseConfig) // <- new to v2.*.*

// react-redux-firebase options
const config = {
    userProfile: 'auth', // firebase root where user profiles are stored
    enableLogging: true, // enable/disable Firebase's database logging
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, config),
)(createStore)
  
let reducers = { firebase: firebaseReducer }
let middlewares = []
let options = {
    reducers,
    middlewares,
    createStore: createStoreWithFirebase
}

export const mastermind = createMastermind({ options, initialStoreState, updateSchemaCreators })


export { ActionTypes } from './instructions'
export default mastermind