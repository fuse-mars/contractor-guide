import {
	authenticationUrl
} from '../api' // TODO

/**
 * CreateGuide instructions.
 * @function redux/instructions/authenticate
 * @name authenticate
 * @param { username: string, password: string } credentials
 */
export default (credentials) => {
	return {
		type: 'api', // required
		serviceOptions: {
			url: authenticationUrl,
			method: 'POST',
			data: credentials,
		},
		successActions: {
			addAuthToStore: {
				location: ['auth', 'auth'],
				operation: 'setIn',
				valueFunction: ({
					res
				}) => {
					let { tokenType, token, isLoggedIn } = res.data
					return { tokenType, token, isLoggedIn }
				}
			},
		},
		failureActions: {
			recordFailure: {
				location: ['appState', 'errors', 'AUTHENTICATE'],
				operation: 'setIn',
				valueFunction: ({
					error
				}) => error.response && error.response.data || error.toString()
			},
			addAuthToStore: {
				location: ['auth', 'auth'],
				operation: 'setIn',
				valueFunction: ({
					res
				}) => {
					let tokenType = 'tokenType', token = 'token', isLoggedIn = true
					return { tokenType, token, isLoggedIn }
				}
			}
		},
	}
}