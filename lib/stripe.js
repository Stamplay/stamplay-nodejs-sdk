var request = require('./request')

var  Stripe = function(auth){
	var base = '/api/stripe/' + auth.version + '/customers/'
	return {
		createSubscription: function(userId, planId, callback){
			var path = request.buildPath(base, userId, false)
			var options = request.buildEndpoint(auth, 'POST', path, {'planId': planId})
			request.make(options, callback)
		},
		getSubscriptions : function (userId, data, callback) {
			var path = request.buildPath(base,  userId, false)
			var options = request.buildEndpoint(auth, 'GET', path, data)
			request.make(options, callback)
		},
		getSubscription: function(userId, subscriptionId, callback){
			var path = request.buildPath(base, userId+'/subscriptions/' + subscriptionId, false)
			var options = request.buildEndpoint(auth, 'GET', path, false)
			request.make(options, callback)
		},
		deleteSubscription: function(userId, subscriptionId, data, callback){
			var path = request.buildPath(base, userId+'/subscriptions/' + subscriptionId, false)
			var options = request.buildEndpoint(auth, 'DELETE', path, data)
			request.make(options, callback)
		},
		updateSubscription: function(userId, subscriptionId, data, scallback){
			var path = request.buildPath(base, userId+'/subscriptions/' + subscriptionId, false)
			var options = request.buildEndpoint(auth, 'PUT', path, data)
			request.make(options, callback)
		}
	}
}
module.exports = Stripe