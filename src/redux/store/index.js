import { Map } from 'immutable'

// store model
export const User = {
    name: undefined,
    email: undefined,
    isContractor: false
}
export const Auth = {
    isLoggedIn: false,
    tokenType: undefined,
    token: undefined,
}

export const Text = {
    description: undefined,
}
export const Image = {
    mediaType: 'png', // TODO
    url: undefined,
}
export const Video = {
    mediaType: 'mp4', // TODO
    url: undefined,
}
export const ContentTypes = {
    TEXT: 'TEXT', IMAGE: 'IMAGE', VIDEO: 'VIDEO'
}
export const Step = {
    order: 0,
    contentType: ContentTypes.TEXT, // TEXT, IMAGE, VIDEO
    content: Text | Image | Video,
}

export const StepMap = {
    // "key": "value"
    // stepId: Step
}
// requirements says that we should change Task to Guide
export const Guide = {
    description: undefined,
    steps: Map(Step),
    author: User
}
export const GuideMap = {
    // "key": "value"
    // guidId: Guide
}

// NOTE: This a representation of all data that should be placed inside the store
export const StateModel = {
    appState: { isFetching: {}, errors: {/* TODO define error objects */}, modals: {/* TODO define model objects */} },
    auth: { user: User, auth: Auth },
    data: { guides: Map(GuideMap), shared: Map(GuideMap) }
}

/**
 * @module redux/store/index
 * @name StateModel
 */
export default StateModel