define(['underscore', 'Q', 'localstorage', 's3'], function(_, Q, localStorage, S3) {
	var s3, path;
	var addToEventQueue = function(item) {
		var queue = localStorage.getItem('syncedstorage._eventQueue');
		queue.push(item);
		localStorage.setItem('syncedstorage._eventQueue');
	};
	var tryEmptyingEventQueue = function() {
		if(!navigator.onLine) {
			return;
		}
		var queue = localStorage.getItem('syncedstorage._eventQueue');
		var q = Q.defer();
		q.resolve();
		_.each(queue, function(item) {
			q = q.success(function() {
				return s3.put(item.key, item.content);
				queue = queue.slice(1);
			});
		});
		localStorage.setitem('syncedstorage._eventQueue');
	};

	window.addEventListener("online", function() {
		tryEmptyingEventQueue();
	}, true);
	tryEmptyingEventQueue();

	return {
		setCredentials: function(endpoint, bucketname, key, secret, _path) {
			s3 = new S3(endpoint, bucketname, key, secret);
			path = _path;
			this.sync();
		},
		sync: function() {
			s3.list(path).success(function(items) {
				var list = [];
				var q = Q.defer();
				q.resolve();
				_.each(items, function(item) {
					q = q.then(function() {
						return s3.get(item.Contents.Key).then(function(content) {
							list.push({
								key: item.Contents.Ket,
								lastModified: item.Contents.LastModified,
								content: content,
							});
							return Q(true);
						});
					});
				});
				return q.then(function(){
					return Q(list);
				});
			}).success(function(items) {

				_.each(items, function(item) {
					localStorage.setItem(item.key, item);
				});
			});
		},
		setItem: function(key, value) {
			var item = {
				key: key,
				lastModified: new Date().toISOString(),
				content: value,
			};
			addToEventQueue(item);
			tryEmptyingEventQueue();
		}
	}
});

