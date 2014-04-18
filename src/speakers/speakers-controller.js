var app = angular.module('myApp');

app.config(function($stateProvider) {
	$stateProvider.state('speakers', {
		url: "/speakers",
		templateUrl: "speakers/speakers.html",
		controller: 'speakersController'
	});
});

app.controller('speakersController', function ($scope, $http, $rootScope) {
	var self = this;

	self.loadSpeakers = function () {
		var url = $rootScope.getBaseUrl() + "conference/1/session/2/speaker";
		$http({method: 'get', url: url })
		    .success(function(data, status, headers, config) {
		    	$scope.speakers = data;
		    })
		    .error(function(data, status, headers, config) {
		     	alert("An error occured while loading session info.");
		    });
    }

    self.loadSpeakers();
});