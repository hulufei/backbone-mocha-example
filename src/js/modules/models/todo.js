/*global Backbone, _ */
'use strict';

// Todo Model
// ----------

var NAUGHTY_WORDS = /crap|poop|hell|frogs/gi;

function sanitize(str) {
    return str.replace(NAUGHTY_WORDS, 'double rainbows');
}

// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
var Todo = Backbone.Model.extend({
    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
        title: '',
        completed: false,
        order: 0
    },

    initialize: function() {
        // Prevent the event from being trigger -> {silent: true}
        this.set({ title: sanitize(this.get('title')) }, { silent: true });
    },

    // Called before save()
    validate: function(attrs) {
        if (attrs.hasOwnProperty('completed') && !_.isBoolean(attrs.completed)) {
            return 'Todo.completed must be a boolean value.';
        }
    },

    // Toggle the `completed` state of this todo item.
    toggle: function () {
        this.save({
            completed: !this.get('completed')
        });
    }
});

module.exports = Todo;
