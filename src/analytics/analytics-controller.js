var app = angular.module('myApp');

app.config(function($stateProvider) {
	$stateProvider.state('analytics', {
		url: "/analytics",
		templateUrl: "analytics/analytics.html",
		controller: 'analyticsController'
	});
});

app.controller('analyticsController', function ($scope, $rootScope, $http) {
	var self = this;

	self.loadUsers = function() {
		var url = $rootScope.getBaseUrl() + "/user";
		$http({method: 'get', url: url })
		    .success(function(data, status, headers, config) {
		    	$scope.users = data;
		    })
		    .error(function(data, status, headers, config) {
		     	alert("An error occured while loading the list of users attending.");
		    });
	};

	self.createChart = function() {
		var data = [
			{
				value: 30,
				color:"#F38630"
			},
			{
				value : 50,
				color : "#E0E4CC"
			},
			{
				value : 100,
				color : "#69D2E7"
			}			
		]
	};

	self.loadUsers();
});