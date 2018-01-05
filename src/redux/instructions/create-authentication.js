import {
	authenticationUrl
} from '../api' // TODO

/**
 * CreateGuide instructions.
 * @function redux/instructions/create-authenticate
 * @name createAuthenticate
 * @param { username: string, password: string } credentials
 */
export default (auth) => {
	return {
		type: 'store', // required
		actions: {
			addAuthToStore: {
				location: ['auth', 'auth'],
				operation: 'setIn',
				valueFunction: () => {
					let isLoggedIn = true
					// let { tokenType, token } = auth Firebase does not provide token and tokenType values
					return Object.assign({}, auth, { isLoggedIn })
				}
			},
		},
	}
}