var app = angular.module('myApp');

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: "",
        templateUrl: "home.html",
        controller: "homeController"
    });
});

app.controller('homeController', function ($scope, $state, $http, $rootScope) {
    var self = this;

    self.tooltipsInitialized = false;

    self.speakers = {};

    self.loadSessions = function () {
        var url = $rootScope.getBaseUrl() + "conference/1/session"
        $http({ method: 'get', url: url })
		    .success(function (data, status, headers, config) {
		        $scope.sessions = data;
		    })
		    .error(function (data, status, headers, config) {
		        $scope.errorMessage = "An error occured while attempting to register.";
		    });
    };

    self.loadSpeakers = function () {
        var url = $rootScope.getBaseUrl() + "conference/1/session/2/speaker";
        $http({method: 'get', url: url })
            .success(function(data, status, headers, config) {

                angular.forEach(data, function(speaker) {
                    self.speakers[speaker.Id] = speaker;
                });

            })
            .error(function(data, status, headers, config) {
                alert("An error occured while loading session info.");
            });
    }

    self.initializeTooltips = function () {
        if(!self.tooltipsInitialized) {
            $('[data-toggle="tooltip"]').tooltip();

            $('[data-toggle="popover"]').popover();

            self.tooltipsInitialized = true;
        }

    };

    $scope.initializeModals = function () {
        self.initializeTooltips();
        //$state.go('sessionAbstract.topic', { id: session.Id });
    };

    $scope.getSpeakerTooltipText = function(speaker) {
        //alert('get speaker tooltip');
        if(!angular.isUndefined(speaker) && !angular.isUndefined(speaker.User)) {
            if(!angular.isUndefined(speaker.User.Bio) && speaker.User.Bio.length > 0) {
                return speaker.User.Bio;
            }
            else {
                return speaker.User.Location;
            }
        }

        return "";
    };

    self.loadSpeakers();
    self.loadSessions();
});