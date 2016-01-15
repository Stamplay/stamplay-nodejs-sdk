var stamplayWebhook = require('../lib/webhook')
var assert = require('assert')

assert.throws(function(){
	var webhook = stamplayWebhook({apiKey:'apiKey',appId:'appId', version:'v1'})().post()
})
var webhook = stamplayWebhook({apiKey:'apiKey',appId:'appId', version:'v1'})('generic')
assert.equal(typeof webhook.base, 'undefined')
assert.equal(typeof webhook.resource, 'undefined')
assert.equal(typeof webhook.post, 'function')