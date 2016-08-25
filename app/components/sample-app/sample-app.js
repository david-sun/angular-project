(function(angular) {
    var sampleApp = angular.module('sampleApp', []);

    // Controller which counts changes to its "name" member
    sampleApp.controller('sampleCtrl', ['$scope', function($scope) {
        $scope.name = 'Eastern Labs';
        $scope.counter = 0;
        $scope.$watch('name', function(newValue, oldValue) {
            $scope.counter = $scope.counter + 1;
        });
    }]);

    // Controller with dependencies on Angular's $http service and promises
    sampleApp.controller('sampleHttp', function($http, $scope, $q) {
        // Returns a promise which is resolved if http calls succeeds,
        // otherwise the promise is rejected
        $scope.getHttp = function() {
            var defer = $q.defer();

            // Perform the actual HTTP call with query parameters
            // e.g. GET <server>/apiURL?name=Eastern%20Labs
            $http({
                method: 'GET',
                url: '/apiURL',
                headers: {
                    'Accept-Language': 'en'
                },
                params: {
                    name: "Eastern Labs"
                }
            }).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;
        };
    });
})(angular);