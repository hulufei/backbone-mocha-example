/*global describe, it, before, after, expect, Todo, AppView, sinon */
'use strict';

function scaffold() {
	var $todoapp = $('<div id="todoapp"/>').appendTo('body');
	$todoapp
		.append('<input id="toggle-all" type="checkbox"/>')
		.append('<input id="new-todo" type="text"/>')
		.append('<div id="footer"/>')
		.append('<div id="main"/>');
	$todoapp.children('#main').append('<ul id="todo-list"/>');
	return $todoapp;
}

describe('Integration Test', function () {
    function triggerEnter($el, eventName, value) {
        var e = jQuery.Event(eventName);
        e.which = 13;
        $el.val(value).trigger(e);
    }

    before(function() {
		this.$todoapp = scaffold();
        this.view = new AppView();
    });

    after(function() {
        this.$todoapp.remove();
        localStorage.clear();
    });

	describe('AppView', function() {
		describe('Instantiation', function() {
			it('should have an empty todo list', function() {
				expect($('#todo-list').children()).to.have.length(0);
			});
		});

		describe('Create item', function() {
			it('should create on enter', function() {
				triggerEnter($('#new-todo'), 'keypress', 'Clean the house');

				var $list = $('#todo-list');
				expect($list.children()).to.have.length(1);
				expect($list.html()).to.contain('Clean the house');
				expect($('#new-todo').val()).to.be.empty;
				expect($('#footer').html()).contain('1');
			});

			it('should update items count', function() {
				triggerEnter($('#new-todo'), 'keypress', 'Clean the house');
				expect($('#footer').html()).contain('2');
			});

			it('should not create with empty input', function() {
				triggerEnter($('#new-todo'), 'keypress', '');

				var $list = $('#todo-list');
				expect($list.children()).to.have.length(2);
				expect($list.html()).to.contain('Clean the house');
				expect($('#footer').html()).contain('2');
			});
		});
		// Other interaction tests: toggleAllComplete, clearCompleted, filter etc.
	});

	describe('Router', function() {
		before(function() {
			this.router = Router.todoRouter;
			// Add one more completed item
			todoList.create({ title: 'Test route ready', completed: true });
		});
		
		it('should ready with expected items', function() {
			var $list = $('#todo-list');
			// Remember other items added in AppView tests
            expect($list.children()).to.have.length(3);
            expect($list.html()).to.contain('Test route ready');
		});

		it('should route to active items', function() {
			this.router.navigate('active', true);

			var $list = $('#todo-list');
            expect($list.children(':visible')).to.have.length(2);
            expect($list.children(':hidden').html()).to.contain('Test route ready');
		});

		it('should route to completed items', function() {
			this.router.navigate('completed', true);

			var $list = $('#todo-list');
            expect($list.children(':visible')).to.have.length(1);
            expect($list.children(':visible').html()).to.contain('Test route ready');
		});

		it('should display all items when route to else where', function() {
			this.router.navigate('elsewhere', true);

			var $list = $('#todo-list');
            expect($list.children(':visible')).to.have.length(3);
		});

		it('should route to all items with a single slash', function() {
			this.router.navigate('', true);

			var $list = $('#todo-list');
            expect($list.children(':visible')).to.have.length(3);
		});
	});
});
