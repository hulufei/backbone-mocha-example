/*global describe, it, expect, sinon, Todo */
'use strict';

describe('Tests for Todo model', function () {
    it('should create global variables for Todo', function () {
        expect(Todo).to.be.exist;
    });

    it('Can be created with default values for its attributes', function() {
        var todo = new Todo();
        expect(todo.get('title')).to.equal('');
    });

    it('should fire a custom event when state change', function() {
        var spy = sinon.spy();
        var todo = new Todo();
        
        todo.on('change', spy);

        todo.set({completed: true, order: 1});
        todo.set('title', 'my title');

        sinon.assert.calledTwice(spy);
    });

    it('should trigger an invalid event on failed validation', function() {
        var errorCallback = sinon.spy();
        var todo = new Todo();

        todo.on('invalid', errorCallback);

        todo.save({ completed: 'unvalid completed value' });

        sinon.assert.calledOnce(errorCallback);
        sinon.assert.calledWithMatch(errorCallback, todo, 'Todo.completed must be a boolean value.');
        // Unless set {validate:true} to be called before set
        expect(todo.get('completed')).to.equal('unvalid completed value');
    });
});
