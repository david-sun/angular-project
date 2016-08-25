(function(angular) {
    'use strict';
    angular.module('myApp.interceptor', [])
        .factory('HttpInterceptor', ['$q', '$log', '$filter',
            function($q, $log, $filter) {

                function getTimeStamp() {
                    return $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss.sss');
                }

                // This is just a example, you do not have to keep 4 of following functions
                // in practice, we just implement the one we needed
                return {
                    request: function(config) {
                        // you can log the event to console
                        $log.log(getTimeStamp() + ': request Method: ' + config.method + ', url: ' + config.url);
                        // you can add extra header info
                        config.headers.Authorization = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        // you can disable the cache
                        config.cache = false;
                        return config || $q.when(config);
                    },
                    requestError: function(rejection) {
                        $log.log(getTimeStamp() + ': request error');
                        // For error function, the explicite reject, otherwise, it will be treated as resolved
                        return $q.reject(rejection);
                    },
                    response: function(response) {
                        $log.log(getTimeStamp() + ': response Method: ' + response.config.method + ', url: ' + response.config.url);
                        return response || $q.when(response);
                    },
                    responseError: function(rejection) {
                        $log.log(getTimeStamp() + ': response error Status: ' + rejection.status + '(' + rejection.statusText + ')' + ' Method: ' + rejection.config.method + ', url: ' + rejection.config.url);
                        // For error function, the explicite reject, otherwise, it will be treated as resolved
                        return $q.reject(rejection);
                    }
                };
            }
        ]);
})(angular)