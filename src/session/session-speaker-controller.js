var app = angular.module('myApp');

app.config(function($stateProvider) {
	$stateProvider.state('sessionDetails.speaker', {
		url: "/speaker",
		templateUrl: "session/session-speaker.html",
		controller: 'sessionSpeakerController'
	});
});

app.controller('sessionSpeakerController', function ($scope, $rootScope, $http, $stateParams) {
	var self = this;

	self.loadSpeakers = function () {
		var url = $rootScope.getBaseUrl() + "conference/1/session/" + $stateParams.id + "/speaker";
		$http({method: 'get', url: url })
		    .success(function(data, status, headers, config) {
		    	$scope.speakers = data;
		    })
		    .error(function(data, status, headers, config) {
		     	alert("An error occured while loading session info.");
		    });
	};

	self.loadSpeakers();
});