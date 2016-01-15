var request = require('./request')

var  Codeblock = function(auth){
	var _parseMethod = function(method) {
		var result = 'POST';
		if (typeof method === 'string') {
			switch (method) {
			case 'GET':
			case 'POST':
			case 'PUT':
			case 'PATCH':
			case 'DELETE':
				result = method;
				break
			default:
				throw new Error('Stamplay.Codeblock(): Invalid HTTP verb: available verbs are GET,POST,PUT,PATCH and DELETE')
				break
			}
		}
		return result;
	}
	var _parseData = function(method, data) {
		var result = (data == null || data == undefined) ? undefined : data
		switch (method) {
		case 'POST':
		case 'PUT':
		case 'PATCH':
			break
		default:
			result = undefined;
			break
		}
		return result
	}
	return function(codeId){
		if(codeId){
			var resource = codeId.replace(/[^\w\s]/gi, '').trim().toLowerCase().replace(/\s+/g, '_')
			var path = '/api/codeblock/' + auth.version + '/run/' + resource
			return {
				run :function (data, queryParams, callback) {		
					var finalMethod = _parseMethod('POST')
					var finalData = _parseData('POST', data)
					var finalQuery = queryParams
					var options = request.buildEndpoint(auth, finalMethod, path, finalData)
					request.make(options, callback)
				}
			}
		}else{
			throw new Error('Stamplay.Codeblock() needs a codeId')
		}
	}
}
module.exports = Codeblock