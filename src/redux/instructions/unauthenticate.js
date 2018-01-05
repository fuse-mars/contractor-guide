import {
	unauthenticationUrl
} from '../api' // TODO

import { Auth } from '../../redux/store'

/**
 * CreateGuide instructions.
 * @function redux/instructions/unauthenticate
 * @name unauthenticate
 */
export default () => {
	return {
		type: 'api', // required
		serviceOptions: {
			url: unauthenticationUrl,
			method: 'DELETE',
		},
		successActions: {
			resetAuth: {
				location: ['auth', 'auth'],
				operation: 'setIn',
				value: Auth
			},
		},
		failureActions: {
			recordFailure: {
				location: ['appState', 'errors', 'UNAUTHENTICATE'],
				operation: 'setIn',
				valueFunction: ({
					error
				}) => error.response && error.response.data || error.toString()
			},
			resetAuth: {
				location: ['auth', 'auth'],
				operation: 'setIn',
				value: Auth
			},
		},
	}
}