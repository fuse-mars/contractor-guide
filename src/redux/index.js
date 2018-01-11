import { compose, createStore } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

import { createMastermind } from 'redux-mastermind'

import { StateModel as initialStoreState } from './store'
import updateSchemaCreators from './instructions'




import createHistory from 'history/createHashHistory'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import { reducer as reduxFormReducer } from 'redux-form'


// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET
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




  
let reducers = { 
    firebase: firebaseReducer,
    router: routerReducer,
    form: reduxFormReducer,
}
let middlewares = [ middleware ]
let options = {
    reducers,
    middlewares,
    createStore: createStoreWithFirebase
}

export const mastermind = createMastermind({ options, initialStoreState, updateSchemaCreators })


export { ActionTypes } from './instructions'
export default mastermind