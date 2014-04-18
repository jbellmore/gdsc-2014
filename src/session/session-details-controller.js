var app = angular.module('myApp');

app.config(function($stateProvider) {
	$stateProvider.state('sessionDetails', {
		url: "/session/{id}",
		templateUrl: "/session/session-details.html",
		controller: 'sessionDetailsController'
	});
});

app.controller('sessionDetailsController', function ($scope, $stateParams, $rootScope, $http) {
	var self = this;

	self.loadSessionInfo = function() {
		var url = $rootScope.getBaseUrl() + "conference/1/session/" + $stateParams.id;
		$http({method: 'get', url: url })
		    .success(function(data, status, headers, config) {
		    	$scope.session = data;
		    })
		    .error(function(data, status, headers, config) {
		     alert("An error occured while loading session info.");
		    });
	};

	self.toggleFollowSession = function(user) {
		var url = $rootScope.getBaseUrl() + "conference/1/session/" + $stateParams.id + "/attendee/" + user.Id;
		var method = "put";
		if($scope.isUserAttending) {
			method = "delete";
		}
		$http({method: method, url: url })
		    .success(function(data, status, headers, config) {
		    	if(method == "put") {
		    		alert('Thank you, you are now following this session!');
		    		$scope.isUserAttending = true;
		    	} else {
		    		alert('You are no longer following this session!');
		    		$scope.isUserAttending = false;
		    	}
		    	
		    })
		    .error(function(data, status, headers, config) {
		      alert(data.ExceptionMessage);
		    });
	};

	self.loadIfCurrentUserIsAttending = function() {
		if($rootScope.getCurrentUser() != null) {
		var url = $rootScope.getBaseUrl() + "conference/1/session/" + $stateParams.id + "/attendee";
			$http({method: 'get', url: url })
			    .success(function(data, status, headers, config) {
			    	var user = $rootScope.getCurrentUser();

	    			angular.forEach(data, function(attendee, key){
			       		if(attendee.User.Id == user.Id) {
			       			$scope.isUserAttending = true;
			       		}
				    });

			    })
			    .error(function(data, status, headers, config) {
			     	alert("An error occured while loading the list of users following this session.");
			    });
		}
	};

	$scope.isUserAttending = false;

	$scope.followSessionClicked = function() {
		if($rootScope.getCurrentUser() == null) {
			var email = prompt("Please enter your e-mail address.");

			if(email != null && email.length > 0) {
				$rootScope.loginUser(email, function(user) {
					self.toggleFollowSession(user);
				});
			}
		}
		else {
			self.toggleFollowSession($rootScope.getCurrentUser());
		}
	};

	self.loadSessionInfo();
	self.loadIfCurrentUserIsAttending();
});