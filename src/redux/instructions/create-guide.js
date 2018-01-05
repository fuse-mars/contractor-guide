import {
	createGuideUrl
} from '../api' // TODO

/**
 * CreateGuide instructions.
 * @function redux/instructions/create-guide
 * @name createGuide
 * @param {Guide} guide
 * @see StoreModel
 */
export default (guide) => {
	return {
		type: 'api', // required
		serviceOptions: {
			url: createGuideUrl,
			method: 'POST',
			data: guide,
		},
		successActions: {
			addGuideToStore: {
				locationFunction: ({
					res
				}) => {
					const guideId = res.data.guide.id
					return ['data', 'guides', guideId]
				},
				operation: 'setIn',
				valueFunction: ({
					res
				}) => res.data.guide
			}
		},
		failureActions: {
			recordFailure: {
				location: ['appState', 'errors', 'CREATE_GUIDE'],
				operation: 'setIn',
				valueFunction: ({
					error
				}) => error.response && error.response.data || error.toString()
			}
		},
	}
}