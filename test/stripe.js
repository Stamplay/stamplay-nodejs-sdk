var stamplayStripe = require('../lib/stripe')
var assert = require('assert')

var Stripe = stamplayStripe({
  apiKey: 'apiKey',
  appId: 'appId',
  version: 'v1'
})

assert.equal(typeof Stripe.base, 'undefined')
assert.equal(typeof Stripe.deleteCustomer, 'function')
assert.equal(typeof Stripe.createSubscription, 'function')
assert.equal(typeof Stripe.getSubscriptions, 'function')
assert.equal(typeof Stripe.getSubscription, 'function')
assert.equal(typeof Stripe.deleteSubscription, 'function')
assert.equal(typeof Stripe.updateSubscription, 'function')
