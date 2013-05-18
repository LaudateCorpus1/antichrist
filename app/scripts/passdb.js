define(['jquery', 'q', 's3', 'localstorage'], function ($, Q, S3, localStorage) {
	var factory = function() {
		var instance = {
			credentials: {
		        endpoint: 's3-eu-west-1.amazonaws.com',
		        bucketname: 'elasticpw.surmair.de',
		        key: 'AKIAIPHHFQAZQOODNXUA',
		        password: 'asdf',
		    },
		    _initialized: false,
		    _is_session_initialized: function() {
				var p = Q.defer();
				if(this._initialized) {
					p.resolve();
				} else {
					p.reject();
				}
				return p.promise;
		    },
		    _is_local_initialized: function() {
				var p = Q.defer();
				var initialized = localStorage.getItem('initialized');
				if(initialized !== null) {
					p.resolve();
				} else {
					p.reject();
				}
				return p.promise;
		    },
		    _is_remote_initialized: function() {
				return $.get('/data/key');
		    },
			is_initialized: function() {
				var p = this._is_session_initialized().
				fail(this._is_local_initialized).
				fail(this._is_remote_initialized).
				then(function() {
					console.log("Session is initialized");
					this._initialized = true;
				});
				return p;
			},
		};
		return instance;
	};

	return {
		register: function(module) {
			module.factory('passdb', factory);
		},
	};
});
