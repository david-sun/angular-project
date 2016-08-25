'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.myArray = [1, 2, 3, 4, 5];

    // it is better to put this modifing standard object function in a seperate service
    Array.prototype.duplicate = function() {
        Array.prototype.push.apply(this, this);
    }

    $scope.duplicate = function() {
        $scope.myArray.duplicate();
    }
}]);