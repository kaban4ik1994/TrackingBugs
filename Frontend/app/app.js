var app = angular.module('tb', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/bugs',
            {
                templateUrl: 'app/partials/listOfBugs.html',
                controller: 'BugListCtrl'
            })
        .otherwise
        ({
            redirectTo: '/bugs'
        });
}]);