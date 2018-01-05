import createGuide from './create-guide'
import createAuthentication from './create-authentication'
import authenticate from './authenticate'
import unauthenticate from './unauthenticate'

export const ActionTypes = {
    CREATE_GUIDE: 'createGuide',
    CREATE_AUTHENTICATE: 'createAuthentication',
    AUTHENTICATE: 'authenticate',
    UNAUTHENTICATE: 'unauthenticate',
}


export default {
    [ActionTypes.CREATE_GUIDE]: guide => createGuide(guide),
    [ActionTypes.CREATE_AUTHENTICATE]: credentials => authenticate(credentials),
    [ActionTypes.AUTHENTICATE]: credentials => authenticate(credentials),
    [ActionTypes.UNAUTHENTICATE]: () => unauthenticate(),
}
