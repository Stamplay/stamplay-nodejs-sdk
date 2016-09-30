var request = require('./request')

var Stripe = function (auth) {
	var base = '/api/stripe/' + auth.version + '/customers'
	return {
		deleteCustomer: function (userId, callback) {
			var path = request.buildPath(base, userId, false)
			var options = request.buildEndpoint(auth, 'DELETE', path)
			request.make(options, callback)
		},
		createSubscription: function (userId, planId, callback) {
			var path = request.buildPath(base, userId + '/subscriptions', false)
			var options = request.buildEndpoint(auth, 'POST', path)
			request.make(options, callback)
		},
		getSubscriptions: function (userId, data, callback) {
			var path = request.buildPath(base, userId + '/subscriptions', false)
			var options = request.buildEndpoint(auth, 'GET', path, data)
			request.make(options, callback)
		},
		getSubscription: function (userId, subscriptionId, callback) {
			var path = request.buildPath(base, userId + '/subscriptions/' + subscriptionId, false)
			var options = request.buildEndpoint(auth, 'GET', path, false)
			request.make(options, callback)
		},
		deleteSubscription: function (userId, subscriptionId, data, callback) {
			var path = request.buildPath(base, userId + '/subscriptions/' + subscriptionId, false)
			var options = request.buildEndpoint(auth, 'DELETE', path, data)
			request.make(options, callback)
		},
		updateSubscription: function (userId, subscriptionId, data, callback) {
			var path = request.buildPath(base, userId + '/subscriptions/' + subscriptionId, false)
			var options = request.buildEndpoint(auth, 'PUT', path, {
				options: data
			})
			request.make(options, callback)
		}
	}
}
module.exports = Stripe
