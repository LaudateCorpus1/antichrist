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
            s3.list('/', function(data) {
                if(!data || data.error) {
                    $scope.status = 'uninitialized';
                    $scope.error = 'This data does not seem valid:' + data.error;
                    $scope.$apply();
                    return;
                }

                var content = Crypto.AES.encrypt(JSON.stringify({
                    endpoint: endpoint,
                    bucketname: bucketname,
                    key: key,
                    secret: secret
                }), password)
                s3.put('/data/key', content, function(data) {
                    if(data && data.error) {
                        $scope.status = 'uninitialized';
                        $scope.error = 'Could not save key file: ' + data.error;
                        $scope.$apply();
                        return;
                    }
                    $scope.status = 'initialized';
                    $scope.$apply();
                })
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
