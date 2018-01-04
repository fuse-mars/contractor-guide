'use strict'
var Pretender = require('pretender')
// console.log()

import { mastermind, ActionTypes } from '.'


describe('Create Guide', () => {
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

    it('should execute ActionTypes.CREATE_GUIDE instructions', () => {
        let execution = mastermind.update(ActionTypes.CREATE_GUIDE, guide)
        return expect(execution).resolves.toBe(undefined)
    })

    describe('Successiful Creation', () => {
        let random1 = 'random1'
        let server;
        beforeAll(() => {
            server = new Pretender(function() {
                this.post('/api/guides', function(request) {
                    return [201, {"Content-Type": "application/json"}, `{ "guide": { "id": "${random1}" } }`]
                })
            })
        })
        afterAll(() => {
            // Clears the database and adds some testing data.
            // Jest will wait for this promise to resolve before running tests.
            return server && server.shutdown()
        })
    
        it('should saves the created object in the right place, for successiful guide creation', async () => {
            let guides = mastermind.getState().data.toJS().guides
            expect(guides.random1).toBeUndefined()
            
            await mastermind.update(ActionTypes.CREATE_GUIDE, guide)
    
            guides = mastermind.getState().data.toJS().guides
            expect(guides.random1).toBeDefined()
        })
    })

    describe('Failed Creation', () => {
        let message = '[Failed Creation] Internal Server Error';
        let server;
        beforeAll(() => {
            server = new Pretender(function() {
                this.post('/api/guides', function(request) {
                    return [500, {"Content-Type": "application/json"}, `{ "message": "${message}" }`]
                })
            })
        })
        afterAll(() => {
            return server && server.shutdown()
        })
    
        it('should saves the error object in the right place, for falied creation', async () => {

            let createNewGuide = mastermind.getState().appState.toJS().errors.CREATE_NEW_GUIDE
            expect(createNewGuide && createNewGuide.message).not.toEqual(message)
            
            await mastermind.update(ActionTypes.CREATE_GUIDE, guide)
    
            createNewGuide = mastermind.getState().appState.toJS().errors.CREATE_NEW_GUIDE
            expect(createNewGuide.message).toEqual(message)
        })
    })
    
})