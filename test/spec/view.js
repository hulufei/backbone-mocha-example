/*global describe, it, beforeEach, afterEach, expect, Todo, TodoView, sinon */
'use strict';

describe('Tests for TodoView', function () {
    var todoView;
    beforeEach(function() {
        var todo = new Todo();
        // Must set up localStorage for model
        todo.localStorage = new Store('ViewSpecs');

        $('body').append('<ul id="todoList"></ul>');
        todoView = new TodoView({ model: todo });
    });

    afterEach(function() {
        todoView.remove();
        $('#todoList').remove();
    });

    it('should be tied to a DOM element when created, based off the property provided', function() {
        expect(todoView.tagName).to.be.equal('li');
        expect(todoView.el.tagName.toLowerCase()).to.be.equal('li');
    });

    it('is backed by a model instance, which provides the data', function() {
        expect(todoView.model).to.exist;
        expect(todoView.model.get('completed')).to.be.false;
    });

    it('when rendered, the view element contains the complete DOM representation of the view', function() {
        todoView.render();

        expect(todoView.$el).not.to.be.empty;
        expect(todoView.$el.find(':checkbox').get(0).checked).to.be.false;
        expect(todoView.$el.find('label').is(':empty')).to.be.true;
    });

    describe('Test interactions', function() {
        beforeEach(function() {
            todoView.model.set({ title: 'todo item' }, { silent: true });
            $('#todoList').append(todoView.render().el);
        });

        it('should toggle complete', function() {
            var spy = sinon.spy(todoView.model, 'toggle');

            $('#todoList').find('.toggle').trigger('click');

            sinon.assert.calledOnce(spy);

            // Unwrap spy
            todoView.model.toggle.restore();
        });

        it('should switch into editing mode', function() {
            $('#todoList').find('label').trigger('dblclick');

            expect(todoView.$el.find('.edit').is(':visible')).to.be.true;
            expect(todoView.$el.find('.edit').val()).to.be.equal('todo item');
        });

        it('should update on enter in editing mode', function() {
            $('#todoList').find('label').trigger('dblclick');

            var e = jQuery.Event('keypress');
            e.which = 13;
            todoView.$el.find('.edit').val('update todo').trigger(e);

            expect(todoView.$el.find('label').text()).to.be.equal('update todo');
            expect(todoView.model.get('title')).to.be.equal('update todo');
        });

        // FIXME: Won't pass in phantomJS, but passed in FF/Chrome, both ui
        // test and spy test
        it.skip('should remove item when enter empty in editing mode', function() {
            var spy = sinon.spy(todoView.model, 'destroy');

            $('#todoList').find('label').trigger('dblclick');

            var e = jQuery.Event('keypress');
            e.which = 13;
            todoView.$el.find('.edit').val('').trigger(e);

            expect($('#todoList').children()).to.have.length(0);

            sinon.assert.calledOnce(spy);
            todoView.model.destroy.restore();
        });
    });
});
