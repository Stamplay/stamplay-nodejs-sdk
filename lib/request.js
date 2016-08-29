var https = require('https')
var qs = require('querystring');

var request = {
	parseQueryParams: function (options) {
		var keys = Object.keys(options.thisParams)
		for (var i = 0; i < keys.length; i++) {
			var conjunction = (i > 0) ? '&' : '?'
			var key = keys[i]
			options.path = options.path + conjunction + key + '=' + qs.escape(options.thisParams[key])
		}
	},
	removeAttributes: function (brick, instance) {
		switch (brick) {
		case 'cobject':
			delete instance.__v
			delete instance.cobjectId
			delete instance.actions
			delete instance.appId
			delete instance.id
			delete instance._id
			break;
		case 'user':
			delete instance._id
			delete instance.id
			delete instance.__v
			break
		default:
			break
		}
	},
	buildPath: function (path, id, action) {
		if (id)
			path = path + '/' + id
		if (action)
			path = path + '/' + action
		return path;
	},
	buildEndpoint: function (auth, method, path, data, qp) {
		var options = {
			hostname: auth.appId + '.stamplayapp.com',
			port: 443,
			auth: auth.appId + ':' + auth.apiKey,
			method: method,
			path: path,
			headers: {
				"Content-Type": "application/json"
			}
		}
		if (data && method != 'GET')
			options.data = data
		if (method == 'GET') {
			options.thisParams = data
		} else {
			// see codeblock
			options.thisParams = qp
		}

		if (options.path.indexOf('?') != -1) {
			var startQuery = options.path.substring(options.path.indexOf('?') + 1, options.path.length);
			var encoded = '';
			startQuery.split('&').forEach(function (i, e) {
				var key = i.split('=')[0];
				var value = qs.escape(i.split('=')[1]);
				encoded += key + '=' + value;
				if (e + 1 !== startQuery.split('&').length) {
					encoded += '&'
				}
			})
			options.path = options.path.replace(/\?.*/, '?' + encoded)
		}
		return options
	},
	make: function (options, callback) {
		if (options.thisParams) {
			request.parseQueryParams(options)
		}
		var req = https.request(options, function (res) {
			res.setEncoding('utf8')
			var body = ''
			res.on('data', function (d) {
				body += d
			})
			res.on('end', function () {
				(res.statusCode >= 200 && res.statusCode < 300) ? callback(null, JSON.parse(body)):
					callback(body, null)
			})
		});
		req.on('error', function (e) {
			callback(e, null)
		})
		var data2send = (options.data) ? JSON.stringify(options.data) : null
		req.end(data2send)
	}
}

module.exports = request
