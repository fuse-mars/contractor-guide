import { compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

import { createMastermind } from 'redux-mastermind'

import { StateModel as initialStoreState } from './store'
import updateSchemaCreators from './instructions'

const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
// react-redux-firebase options
const config = {
    userProfile: 'auth', // firebase root where user profiles are stored
    enableLogging: true, // enable/disable Firebase's database logging
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, fonfig),
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