'use strict';

describe('Controller: sampleCtrl', function() {
    var scope;
    var sampleCtrl;

    // init module
    beforeEach(function() {
        module('sampleApp', function($provide) {
            // some mockup setup, but this controller does not have other dependencies
        })
    });

    // init controller
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        sampleCtrl = $controller('sampleCtrl', {
            $scope: scope
        });
    }));
    afterEach(function() {
        // clean up the big data
        scope = null;
    })

    it('should trigger the counter plus 1 if name changed', function() {
        // setup
        // This case, there is no special setup
        // execute
        scope.name = 'New Eastern Lab';
        scope.$apply();
        // verify
        expect(scope.counter).toBe(1);
    });
});

describe('Controller: sampleHttp', function() {
    var scope;
    var sampleHttp;
    var $httpBackend;
    var $rootScope;

    // init module
    beforeEach(function() {
        module('sampleApp', function($provide) {
            // some mockup setup, but this controller does not have other dependencies
        })
    });

    // init controller
    beforeEach(inject(function($controller, _$rootScope_, _$httpBackend_) {
        $httpBackend = _$httpBackend_; // you can also inject it in the test function instead of set it in closure
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        sampleHttp = $controller('sampleHttp', {
            $scope: scope
        });
    }));
    afterEach(function() {
        // clean up the big data
        scope = null;
    })

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should handle the successful requst and return data', function() {
        // setup
        var url = '/apiURL?name=Eastern+Labs';
        var data = {
            a: [1, 2],
            b: 'c'
        };
        // Function to verify if the headers contain specified key-value
        var headersFn = function(headers) {
            if (headers['Accept-Language'] === 'en') {
                return true;
            }

            return false;
        }
        $httpBackend.expect('GET', url, undefined, headersFn).respond(200, data);
        var successHandler = jasmine.createSpy('success');
        var errorHandler = jasmine.createSpy('error');
        // execute
        var result = scope.getHttp();
        $httpBackend.flush();
        // verify
        result
            .then(successHandler, errorHandler)
            .finally(function() {
                expect(successHandler).toHaveBeenCalledWith(data);
                expect(errorHandler).not.toHaveBeenCalled();
            })
        $rootScope.$apply(); // trigger $q
    });

    it('should handle the failed requst', function() {
        // setup
        var url = '/apiURL?name=Eastern+Labs';
        var data = 'Internal Error';
        // Function to verify if the headers contain specified key-value
        var headersFn = function(headers) {
            if (headers['Accept-Language'] === 'en') {
                return true;
            }

            return false;
        }
        $httpBackend.expect('GET', url, undefined, headersFn).respond(500, data);
        var successHandler = jasmine.createSpy('success');
        var errorHandler = jasmine.createSpy('error');
        // execute
        var result = scope.getHttp();
        $httpBackend.flush();
        // verify
        result
            .then(successHandler, errorHandler)
            .finally(function() {
                expect(successHandler).not.toHaveBeenCalled();
                expect(errorHandler).toHaveBeenCalledWith(undefined);
            })
        $rootScope.$apply(); // trigger $q
    });

});