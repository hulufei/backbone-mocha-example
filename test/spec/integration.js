/*global describe, it, before, after, expect, Todo, AppView, sinon */
'use strict';

describe('Tests for AppView(integration test)', function () {
    function triggerEnter($el, eventName, value) {
        var e = jQuery.Event(eventName);
        e.which = 13;
        $el.val(value).trigger(e);
    }

    before(function() {
        this.$todoapp = $('<div id="todoapp"/>').appendTo('body');
        this.$todoapp
            .append('<input id="toggle-all" type="checkbox"/>')
            .append('<input id="new-todo" type="text"/>')
            .append('<div id="footer"/>')
            .append('<div id="main"/>');
        this.$todoapp.children('#main').append('<ul id="todo-list"/>');

        this.view = new AppView();
    });

    after(function() {
        this.$todoapp.remove();
        localStorage.clear();
    });

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
