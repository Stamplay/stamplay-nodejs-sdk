var request = require('./request')

var Codeblock = function (auth) {

	return function (codeId) {
		if (codeId) {
			var resource = codeId.replace(/[^\w\s]/gi, '').trim().toLowerCase().replace(/\s+/g, '_')
			var path = '/api/codeblock/' + auth.version + '/run/' + resource
			return {
				run: function (data, queryParams, callback) {
					var options = request.buildEndpoint(auth, 'POST', path, data, queryParams)
					request.make(options, callback)
				},
				post: function (data, queryParams, callback) {
					var options = request.buildEndpoint(auth, 'POST', path, data, queryParams)
					request.make(options, callback)
				},
				get: function (queryParams, callback) {
					var options = request.buildEndpoint(auth, 'GET', path, null, queryParams)
					request.make(options, callback)
				},
				put: function (data, queryParams, callback) {
					var options = request.buildEndpoint(auth, 'PUT', path, data, queryParams)
					request.make(options, callback)
				},
				patch: function (data, queryParams, callback) {
					var options = request.buildEndpoint(auth, 'POST', path, data, queryParams)
					request.make(options, callback)
				},
				delete: function (queryParams, callback) {
					var options = request.buildEndpoint(auth, 'POST', path, null, queryParams)
					request.make(options, callback)
				},
			}
		} else {
			throw new Error('Stamplay.Codeblock() needs a codeId')
		}
	}
}
module.exports = Codeblock
