define(['jquery', 'crypto'], function($, Crypto) {
	var Request = function() {
		this.verb = 'GET';
		this.host = '';
		this.bucketname = '';
		this.path = '';
		this.headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		};
		this.date = new Date().toString();
		this.content = '';
		this.request_parameters = {};

		this.sign = function(key, secret) {
			this.headers['Authorization'] = 'AWS '+key+':'+this.signature(secret);
		};
		this.signature = function(secret) {
			btoa(Crypto.HMAC(Crypto.SHA1, this._toSign(), secret, {asString: true}));
		};
		this.canonicalResource = function() {
			return '/'+this.bucketname+'/'+this.path;
		};
		this.make_request = function() {
			this.headers["Host"] = this.hostname;
			return $.ajax(this._url(), {
				contentType: this.headers["Content-Type"],
				crossDomain: true,
				data: this.content,
				headers: this.headers,
			})
		};

		this._toSign = function() {
			return this.verb.toUpperCase()+'\n'+
			Crypto.MD5(this.content)+'\n'+
			this.headers['Content-Type']+'\n'+
			this.date+'\n'+
			this._url(true)+'\n'+
			this.canonicalResource();
		};
		this._url = function(strip_query) {
			var url = 'https://'+this.host+'/'+this.bucketname+'/'+this.path;
			if(strip_query) {
				return url;
			}
			var sep = '?';
			for(key in this.request_parameters) {
				url += sep + key + '=' + this.request_parameters[key];
				sep = '&';
			}
			return url;
		};
	}

	return function(endpoint, bucketname, key, secret) {
		return {
			endpoint: endpoint,
			bucketname: bucketname,
			key: key,
			secret: secret,

			list: function(prefix, cb) {
				var req = new Request();
				req.host = endpoint;
				req.bucketname = this.bucketname;
				if(prefix) {
					req.request_parameters["prefix"] = prefix;
				}
				req.sign(key, secret);
				req.make_request().success(function(data) {
					cb(data);
				}).error(function(data) {
					cb({error: data});
				});
			}
		}
	}
});

