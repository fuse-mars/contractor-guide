import { mastermind, ActionTypes } from '.'

describe('Create Guide', () => {
    // should execute ActionTypes.CREATE_GUIDE instructions
    // should saves the created object in the right place, for successiful guide creation
    // should saves the error object in the right place, for falied creation
    it('should execute ActionTypes.CREATE_GUIDE instructions', () => {
        const steps = {
            'step-id-1': 'lorem ipsum',
            'step-id-2': 'lorem ipsum',
            'step-id-3': 'lorem ipsum',
        }
        const author = { 'name': 'Mars' }
        const guide = {
            id: 'guide-id-1',
            description: 'lorem ipsum',
            steps, author
        }
        return mastermind.update(ActionTypes.CREATE_GUIDE, guide)
        .then(res => {
            console.log('[REDUX TEST] mastermind.update', res)
            expect('DEBUGGING').toEqual('DEBUGGING')
        })        
    })
    it('should saves the created object in the right place, for successiful guide creation', () => {
        // console.log('[REDUX TEST] mastermind.update', mastermind.getState().data.toJS())
        throw new Error('NOT Implemented')
    })
    it('should saves the error object in the right place, for falied creation', () => {
        // console.log('[REDUX TEST] mastermind.update', mastermind.getState().appState.toJS())    
        throw new Error('NOT Implemented')
    })
    
})