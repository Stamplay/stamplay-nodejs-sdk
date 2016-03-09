var request = require('./request')
var Object = function(auth) {
	return function(resourceId){
		if(resourceId){
			var base = '/api/cobject/' + auth.version + '/'+ resourceId
			return {
				get: function(data, callback){
					var path = request.buildPath(base, false, false)
					var options = request.buildEndpoint(auth, 'GET', path, data)
					request.make(options, callback)
				},
				save : function (data, callback) {
					var path = request.buildPath(base, false, false)
					var options = request.buildEndpoint(auth, 'POST',path, data)
					request.make(options, callback)
				},
				patch : function(id, data, callback){
					request.removeAttributes('cobject', data);
					var path = request.buildPath(base,  id, false)
					var options = request.buildEndpoint(auth, 'PATCH', path, data)
					request.make(options, callback)
				},
				update: function(id, data,  callback){
					var path = request.buildPath(base,  id, false)
					request.removeAttributes('cobject', data);
					var options = request.buildEndpoint(auth, 'PUT', path, data)
					request.make(options, callback)
				},
				remove: function(id, callback){
					var path = request.buildPath(base,  id, false)
					var options = request.buildEndpoint(auth, 'DELETE', path, false)
					request.make(options, callback)
				},				
				upVote : function (id, callback) {
					var path = request.buildPath(base,  id, 'vote')
					var options = request.buildEndpoint(auth, 'PUT', path, {type:'upvote'})
					request.make(options, callback)
				},
				downVote: function (id, callback) {
					var path = request.buildPath(base,  id, 'downvote')
					var options = request.buildEndpoint(auth, 'PUT', path, {type:'upvote'})
					request.make(options, callback)
				},
				rate: function (id, vote, callback) {
					var path = request.buildPath(base,  id, 'rate')
					var options = request.buildEndpoint(auth, 'PUT', path, {rate:vote})
					request.make(options, callback)
				},
				comment: function (id, text, callback) {
					var path = request.buildPath(base,  id, 'comment')
					var options = request.buildEndpoint(auth, 'PUT', path, {text:text})
					request.make(options, callback)
				}, 
				push: function(id, attribute, data, callback) {
					var path = request.buildPath(base, id, false)
					var options = request.buildEndpoint(auth, 'GET', path, false)
					request.make(options, function(err,resp){
						if(err)
							callback(err, null)
						else{
							var newData = {}
							newData[attribute] = JSON.parse(resp[attribute])
							newData[attribute].push(data)
							var options = request.buildEndpoint(auth, 'PATCH', path, newData)
							request.make(options, callback)
						}
					})
				}
			}
		}else{
			throw new Error('Stamplay.Object(objecId) needs a objectId')
		}
	}
}
module.exports = Object