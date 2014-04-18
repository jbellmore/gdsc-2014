var app = angular.module('myApp');

app.config(function($stateProvider) {
	$stateProvider.state('details', {
		url: "/details",
		templateUrl: "details.html",
		controller: 'detailsController'
	});
});

app.controller('detailsController', function ($scope) {
	var self = this;


});