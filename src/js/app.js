/*global $ */
/*jshint unused:false */
var app = app || {};

app.AppView = require('./modules/views/app-view');

$(function () {
	'use strict';

	// kick things off by creating the `App`
	new app.AppView();
});
