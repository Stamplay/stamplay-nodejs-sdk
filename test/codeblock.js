var stamplayCodeblock = require('../lib/codeblock')
var assert = require('assert')

assert.throws(function(){
	var code = stamplayCodeblock({apiKey:'apiKey',appId:'appId', version:'v1'})().run()
})
var code = stamplayCodeblock({apiKey:'apiKey',appId:'appId', version:'v1'})('generic')
assert.equal(typeof code.base, 'undefined')
assert.equal(typeof code.resource, 'undefined')
assert.equal(typeof code.run, 'function')