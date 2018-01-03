import { createMastermind } from 'redux-mastermind'

// import { STATE_MODEL as initialState } from './store'
// import instructions from './instructions'
// create the mastermind, this time adding instructions as a second argument
// export default createMastermind({}, initialState, instructions)


import { StateModel as initialStoreState } from './store'
import updateSchemaCreators, { ActionTypes } from './instructions'

export { ActionTypes } from './instructions'

export const mastermind = createMastermind({ initialStoreState, updateSchemaCreators })

export default mastermind