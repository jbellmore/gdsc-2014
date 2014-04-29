var app = angular.module('myApp', ['ui.router', 'ngCookies']);
app.run(function ($rootScope, $state, $cookieStore, $http) {
	  
     $rootScope.getBaseUrl = function () {
        // return "http://localhost:1998/api/v1/";
             return "http://glic.azurewebsites.net/api/v1/";
     };

     if($cookieStore.get('hasShownNotice') == null) {
        $('#noticeDialog').modal('show');
        $cookieStore.put('hasShownNotice', true);
     }

	$rootScope.$state = $state;
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