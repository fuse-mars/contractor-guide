import createGuide from './create-guide'

export const ActionTypes = {
    CREATE_GUIDE: 'createGuide'
}

export default {
    [ActionTypes.CREATE_GUIDE]: guide => createGuide(guide),
}
