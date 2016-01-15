var request = require('./request')

var  Webhook = function(auth){
	return function(resourceId){
		if(resourceId){
			var resource = resourceId.replace(/[^\w\s]/gi, '').trim().toLowerCase().replace(/\s+/g, '_')
			var base = '/api/webhook/' + auth.version + '/' +resource +'/catch'
			return {
				post: function(data, callback){
					var path = request.buildPath(base,  false, false)
					var options = request.buildEndpoint(auth, 'GET', path, data)
					request.make(options, callback)
				}
			}
		}else{
			throw new Error('Stamplay.Webhook() needs a webhookId');
		}
	}
}
module.exports = Webhook