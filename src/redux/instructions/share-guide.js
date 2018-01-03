import {
	shareGuideUrl
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
			url: shareGuideUrl,
			method: 'POST',
			data: guide,
		},
		successActions: {
			addGuideToStore: {
				locationFunction: ({
					res
				}) => {
					const guideId = res.data.guide.id
					return ['data', 'shared', guideId]
				},
				operation: 'setIn',
				valueFunction: ({
					res
				}) => res.data.guide
			}
		},
		failureActions: {
			recordFailure: {
				location: ['appState', 'errors', 'createNewGuide'],
				operation: 'setIn',
				valueFunction: ({
					error
				}) => error
			}
		},
	}
}