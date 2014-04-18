var app = angular.module('myApp');

app.config(function($stateProvider) {
	$stateProvider.state('sessionDetails.attendees', {
		url: "/attendees",
		templateUrl: "session/session-attendees.html",
		controller: 'sessionAttendeesController'
	});
});

app.controller('sessionAttendeesController', function ($scope, $stateParams, $rootScope, $http) {
	var self = this;

	self.loadAttendees = function() {
		var url = $rootScope.getBaseUrl() + "conference/1/session/" + $stateParams.id + "/attendee";
		$http({method: 'get', url: url })
		    .success(function(data, status, headers, config) {
		    	$scope.attendees = data;
		    })
		    .error(function(data, status, headers, config) {
		     	alert("An error occured while loading the list of users following this session.");
		    });
	};

	self.loadAttendees();
});