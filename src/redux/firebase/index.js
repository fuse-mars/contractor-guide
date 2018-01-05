import { compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'

// Firebase config
const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, initialState)