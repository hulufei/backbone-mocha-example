/*global describe, it, beforeEach, expect, todoList */
'use strict';

describe('Tests for TodoList', function () {
    var todos = todoList;
    beforeEach(function() {
        todos.reset();
    });

    it('should add Model instances as objects and arrays', function() {
        expect(todos).to.have.length(0);

        todos.add({ title: 'Clean the kitchen' });

        expect(todos).to.have.length(1);

        todos.add([
            { title: 'Do the laundry', completed: true },
            { title: 'Go to the gym' }
        ]);

        expect(todos).to.have.length(3);
    });

    it('should have a comparator function to keep the collection sorted', function() {
        // Model attribute doesn't match is ok
        todos.add([
            { text: 'Clean the house', order: 8 },
            { text: 'Do the laundry', order: 4 },
            { text: 'Take a nap', order: 3 }
        ]);

        expect(todos.at(0).get('text')).to.equal('Take a nap');
        expect(todos.at(1).get('text')).to.equal('Do the laundry');
        expect(todos.at(2).get('text')).to.equal('Clean the house');
    });

    it('should calculate completed and remaining items', function() {
        todos.add([
            { title: 'Clean the house', completed: true },
            { text: 'Do the laundry', completed: false },
            { text: 'Take a nap', completed: false }
        ]);

        var completedItems = todos.completed();
        var remainingItems = todos.remaining();

        expect(completedItems).to.have.length(1);
        expect(remainingItems).to.have.length(2);
        expect(completedItems[0].get('title')).to.equal('Clean the house');
        expect(remainingItems[0].get('text')).to.equal('Do the laundry');
        expect(remainingItems[1].get('text')).to.equal('Take a nap');
    });
});
