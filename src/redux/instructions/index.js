import createGuide from './create-guide'
import authenticate from './authenticate'
import unauthenticate from './unauthenticate'

export const ActionTypes = {
    CREATE_GUIDE: 'createGuide',
    AUTHENTICATE: 'authenticate',
    UNAUTHENTICATE: 'unauthenticate',
}

export default {
    [ActionTypes.CREATE_GUIDE]: guide => createGuide(guide),
    [ActionTypes.AUTHENTICATE]: credentials => authenticate(credentials),
    [ActionTypes.UNAUTHENTICATE]: () => unauthenticate(),
}
