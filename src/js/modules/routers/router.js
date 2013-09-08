/*global Backbone */
'use strict';

var todos = require('../collections/todos');

// Todo Router
// ----------
var TodoRouter = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    setFilter: function (param) {
        // Set the current filter to be used
        exports.TodoFilter = param || '';

        // Trigger a collection filter event, causing hiding/unhiding
        // of Todo view items
        todos.trigger('filter');
    }
});

// TodoRouter instance
exports.todoRouter = new TodoRouter();

Backbone.history.start();
