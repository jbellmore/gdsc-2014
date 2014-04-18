app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: "",
		templateUrl: "/home.html",
		controller: 'myController'
	});
});

app.controller('myController', function ($scope) {
	var self = this;
});