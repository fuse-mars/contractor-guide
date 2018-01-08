// source: 

import { createMastermind } from 'redux-mastermind'

// import { STATE_MODEL as initialState } from './store'
// import instructions from './instructions'
// create the mastermind, this time adding instructions as a second argument
// export default createMastermind({}, initialState, instructions)


import { StateModel as initialStoreState } from './store'
import updateSchemaCreators, { ActionTypes } from './instructions'

import createHistory from 'history/createHashHistory'

import { routerReducer, routerMiddleware } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)


// const store = createStore(
//     combineReducers({
//       ...reducers,
//       router: routerReducer
//     }),
//     applyMiddleware(middleware)
// )
let reducers = { router: routerReducer }
let middlewares = [ middleware ]
let options = {
    reducers,
    middlewares,
}

export const mastermind = createMastermind({ initialStoreState, updateSchemaCreators })

export { ActionTypes } from './instructions'
export default mastermind