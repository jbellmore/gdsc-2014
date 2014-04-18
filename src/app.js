var app = angular.module('myApp', ['ui.router', 'ngCookies']);

app.run(function ($rootScope, $state, $cookieStore, $http) {
	
	$rootScope.getBaseUrl = function(){
		return "http://glic.azurewebsites.net/api/v1/";
		// return "http://localhost:1998/api/v1/";
	};

	$rootScope.$state = $state;

    $rootScope.contactEmail = "jarrod_bellmore@glic.com";

    $rootScope.loginUser = function(email, callback) {
        var url = $rootScope.getBaseUrl() + "user?emailAddress=" + email;
        $http({method: 'get', url: url })
            .success(function(data, status, headers, config) {
                if(data != null && data != "null") {
                    $cookieStore.put("user", data);

                    if(!angular.isUndefined(callback)) {
                        callback($rootScope.getCurrentUser());
                    }
                }
                else {
                    alert('User not found, please register for the conference to follow a session.');
                }
            })
            .error(function(data, status, headers, config) {
                alert('User not found, please register for the conference to follow a session.');
            });
    }

    $rootScope.getCurrentUser = function() {
        return $cookieStore.get("user");
    }
});

app.filter('newlines', function ($sce) {
    return function(text) {
    	if(!angular.isUndefined(text)){
    		return $sce.trustAsHtml(text.replace(/\n/g, '<br/>'));
    	} else {
    		return text;
    	}
    }
})