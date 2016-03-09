var stamplayObject = require('../lib/object')
var assert = require('assert')

assert.throws(function(){
	var obj = stamplayObject({apiKey:'apiKey',appId:'appId', version:'v1'})().get()
})
var genericObj = stamplayObject({apiKey:'apiKey',appId:'appId', version:'v1'})('generic')

assert.equal(typeof genericObj.base, 'undefined')
assert.equal(typeof genericObj.get, 'function')
assert.equal(typeof genericObj.save, 'function')
assert.equal(typeof genericObj.patch, 'function')
assert.equal(typeof genericObj.update, 'function')
assert.equal(typeof genericObj.remove, 'function')
assert.equal(typeof genericObj.upVote, 'function')
assert.equal(typeof genericObj.downVote, 'function')
assert.equal(typeof genericObj.rate, 'function')
assert.equal(typeof genericObj.comment, 'function')
assert.equal(typeof genericObj.push, 'function')
