var app = angular.module('myApp');

app.config(function($stateProvider) {
	$stateProvider.state('sessions', {
		url: "/sessions",
		templateUrl: "/session/sessions.html",
		controller: 'sessionsController'
	});
});

app.controller('sessionsController', function ($scope, $state, $http, $rootScope) {
	var self = this;

	self.loadSessions = function() {
		var url = $rootScope.getBaseUrl() + "conference/1/session"
		$http({method: 'get', url: url })
		    .success(function(data, status, headers, config) {
		    	$scope.sessions = data;
		    })
		    .error(function(data, status, headers, config) {
		      $scope.errorMessage = "An error occured while attempting to register.";
		    });
	};

	// $scope.sessions = [
	// 	{
	// 		"Id": 1,
	// 		"Name": "Single Page Apps with Angular JS",
	// 		"Description": "A quick introduction to AngularJS and some of the basic concepts and then move straight into building a single page app from scratch using Angular (and Bootstrap to provide the UI elements quickly) so people can see what it takes to set one up and how to structure an Angular application.\n\nAfter the demo I would think a quick discussion of the experience we had building one within the Guardian environments and problems you may encounter and need to solve.\n\nThen some time for Q&A, hopefully this all fits into the time frame allocated!",
	// 		"Location": "sample string 4",
	// 		"StartTime": Date.parse("5/7/2014 9:00:00"),
	// 		"FinishTime": Date.parse("5/7/2014 10:00:00"),
	// 		"SessionType": {
	// 			"Id": 1,
	// 			"Name": "Presentation",
	// 			"Description": "Topic presented by one or more individuals with a Q & A session at the end."
	// 		}
	//   	},
	//   	{
	//   		"Id": 2,
	// 		"Name": "Some Other Sessions",
	// 		"Description": "Doing some other random stuff",
	// 		"Location": "sample string 4",
	// 		"StartTime": Date.parse("5/7/2014 10:00:00"),
	// 		"FinishTime": Date.parse("5/7/2014 11:00:00"),
	// 		"SessionType": {
	// 			"Id": 2,
	// 			"Name": "Birds of a Feather",
	// 			"Description": "Discussion of like minded individuals."
	// 		}
	//   	}
 //  	];

  	$scope.sessionClicked = function(session) {
  		$state.go('sessionDetails.speaker', { id: session.Id });
  	};

  	self.loadSessions();
});