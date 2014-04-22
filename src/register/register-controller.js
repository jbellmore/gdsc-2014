var app = angular.module('myApp');

app.config(function ($stateProvider) {
    	$stateProvider.state('register', {
		url: "/register",
		templateUrl: "register/register.html",
		controller: 'registerController'
	});
});

app.controller('registerController', function ($scope, $rootScope, $http, $window) {
	var self = this;

	$scope.showValidation = false;
	$scope.showSuccess = false;
	$scope.errorMessage = "";

	$scope.populateEmail = function() {
		if(!angular.isUndefined($scope.user.FirstName) && $scope.user.FirstName.length > 0
			&& !angular.isUndefined($scope.user.LastName)&& $scope.user.LastName.length > 0) {
			$scope.user.EmailAddress = $scope.user.FirstName + "_" + $scope.user.LastName + "@glic.com";
		}
	};

	$scope.registerUser = function(user, isValid) {
		
		$scope.errorMessage = "";

		if(!isValid) {
			$scope.showValidation = true;
			$scope.errorMessage = "Oops some fields are invalid, please fix the highlighted inputs and try again!"
		}
		else{
			var url = $rootScope.getBaseUrl() + "user";

			switch(user.attendDay) {
				case "Day-1":
				  user.AttendingFirstDay = true;
				  user.AttendingSecondDay = false;
				  user.AttendingBothDays  = false;
				  break;
				case "Day-2":
				  user.AttendingFirstDay = false;
				  user.AttendingSecondDay = false;
				  user.AttendingBothDays  = true;
				  break;
			  case "Both":
				  user.AttendingFirstDay = true;
				  user.AttendingSecondDay = true;
				  user.AttendingBothDays  = true;
				  break;
				default:
				  user.AttendingFirstDay = false;
				  user.AttendingSecondDay = false;
				  user.AttendingBothDays  = false;
				  break;
			}

			$http({method: 'put', url: url, data: user})
			    .success(function(data, status, headers, config) {
			    	//$rootScope.loginUser(user.EmailAddress);
			    	$scope.user = {};
		      		$scope.showSuccess = true;
			    })
			    .error(function(data, status, headers, config) {
			      $scope.errorMessage = data.ExceptionMessage;
			    });
		}

	};

	$window.scrollTo(0,0);

});