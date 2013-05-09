define(['jquery', 's3', 'angular'], function ($, S3, angular) {
    'use strict';

    var app = angular.module('app', []);
    app.controller('init', ['$scope', '$http', function($scope, $http) {
        $scope.status = 'loading';
        $http.get('/data/key').success(function(data) {
            $scope.status = 'initialized';
        }).error(function() {
            $scope.status = 'uninitialized';
        });
    }]);
    return app;
});
