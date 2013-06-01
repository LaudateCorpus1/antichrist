define(['underscore', 'localstorage', 's3'], function(_, localStorage, S3) {
	var s3, path;
	return {
		setCredentials: function(endpoint, bucketname, key, secret, _path) {
			s3 = new S3(endpoint, bucketname, key, secret);
			path = _path;
			this.sync();
		},
		sync: function() {
			s3.list(path).success(function(list) {

			}).success(function(items) {
				localStorage.clear();
				_.each(items, function(val, key) {
					localStorage.setItem(key, val);
				});
			})
		}
	}
});

