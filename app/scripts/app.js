define(['jquery', 's3', 'angular', 'crypto', 'passdb'], function ($, S3, angular, Crypto, passdb) {
    'use strict';

    var app = angular.module('app', []);
    passdb.register(app);

    app.controller('init', ['$scope', 'passdb', function($scope, passdb) {
        // $scope.endpoint = 's3.amazonaws.com';
        // Temporary:
        $scope.endpoint = 's3-eu-west-1.amazonaws.com';
        $scope.bucketname = 'elasticpw.surmair.de';
        $scope.key = 'AKIAIPHHFQAZQOODNXUA';
        $scope.password = 'asdf';
        $scope.password2 = 'asdf';
        $scope.error = '';
        $scope.status = 'loading';

        passdb.is_initialized().then(function() {
            $scope.status = 'initialized';
            $scope.$apply();
        }, function() {
            $scope.status = 'uninitialized';
            $scope.$apply();
        });

        $scope.initialize = function(endpoint, bucketname, key, secret, password) {
            if($scope.passwords_match() != 'Match!') {
                $scope.error = 'Passwords do not match';
                return
            }
            $scope.status = 'loading';
            var s3 = new S3(endpoint || '', bucketname || '', key || '', secret || '');
            s3.list('/').then(function(data) {
                var content = Crypto.AES.encrypt(JSON.stringify({
                    endpoint: endpoint,
                    bucketname: bucketname,
                    key: key,
                    secret: secret
                }), password);
                return s3.put('/data/key', content);
            }).then(function(data) {
                $scope.status = 'initialized';
                $scope.$apply();
            }).fail(function(error) {
                $scope.status = 'uninitialized';
                if(typeof(error.error) != "string") {
                    error = {error: 'Unknown error'};
                }
                $scope.error = 'Something went wrong: ' + error.error;
                $scope.$apply();
                return;
            });
        };

        $scope.passwords_match = function() {
            if(!$scope.password || !$scope.password2) {
                return '';
            }
            if($scope.password != $scope.password2) {
                return 'Mismatch!';
            }
            return 'Match!';
        }
    }]);
    return app;
});
