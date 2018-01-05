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
		beforeActions: {
			showLoader: {
				location: ['appState', 'loading', 'UNAUTHENTICATE'],
				operation: 'setIn',
				value: true
			}
		},	
		successActions: {
			resetAuth: {
				location: ['auth', 'auth'],
				operation: 'setIn',
				value: Auth
			},
			hideLoader: { // @TODO remove once afterActions works properly
				location: ['appState', 'loading', 'UNAUTHENTICATE'],
				operation: 'setIn',
				value: false
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
			hideLoader: { // @TODO remove once afterActions works properly
				location: ['appState', 'loading', 'UNAUTHENTICATE'],
				operation: 'setIn',
				value: false
			},
		},
		afterActions: {
			hideLoader: {
				location: ['appState', 'loading', 'UNAUTHENTICATE'],
				operation: 'setIn',
				value: false
			},
		},
	}
}