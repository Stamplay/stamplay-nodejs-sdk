var request = require('../lib/request')
var assert = require('assert')

assert.equal(typeof request.parseQueryParams, 'function')
assert.equal(typeof request.removeAttributes, 'function')
assert.equal(typeof request.buildPath, 'function')
assert.equal(typeof request.buildEndpoint, 'function')
assert.equal(typeof request.make, 'function')

var options = {
	path: "",
	thisParams: {
		"a": "a",
		"b": "b"
	}
}
request.parseQueryParams(options)
assert.equal(options.path, "?a=a&b=b")

var options = {
	path: "",
	thisParams: {}
}
assert.equal(options.path, "")

var brick = "cobject"
var instance = {
	__v: "a",
	cobjectId: "b",
	actions: "a",
	appId: "b",
	id: "a",
	_id: "a",
	value: "value"
}

request.removeAttributes(brick, instance)
assert.equal(instance.cobjectId, undefined)
assert.equal(instance.__v, undefined)
assert.equal(instance.actions, undefined)
assert.equal(instance.appId, undefined)
assert.equal(instance.id, undefined)
assert.equal(instance._id, undefined)
assert.equal(instance.value, "value")

brick = "user"
instance = {
	__v: "a",
	id: "a",
	value: "value"
}
request.removeAttributes(brick, instance)
assert.equal(instance.__v, undefined)
assert.equal(instance.id, undefined)
assert.equal(instance._id, undefined)
assert.equal(instance.value, "value")
assert.equal(request.buildPath("", "", "a"), "/a")
assert.equal(request.buildPath("", "123", "a"), "/123/a")
assert.equal(request.buildPath("path", "", "a"), "path/a")

var auth = {
	appId: "a",
	apiKey: "b"
}
var data = {
	a: "a"
}
var opt = request.buildEndpoint(auth, "GET", "path/123", false)
assert.equal(opt.hostname, "a.stamplayapp.com")
assert.equal(opt.auth, "a:b")
assert.equal(opt.method, "GET")
assert.equal(typeof opt.data, "undefined")

var opt = request.buildEndpoint(auth, "POST", "path", data)
assert.equal(opt.hostname, "a.stamplayapp.com")
assert.equal(opt.auth, "a:b")
assert.equal(opt.method, "POST")
assert.equal(typeof opt.data, "object")
assert.equal(opt.data.a, "a")

var opt = request.buildEndpoint(auth, "POST", "?a= a&b= b", data)
assert.equal(opt.hostname, "a.stamplayapp.com")
assert.equal(opt.auth, "a:b")
assert.equal(opt.method, "POST")
assert.equal(typeof opt.data, "object")
assert.equal(opt.path, "?a=%20a&b=%20b")

var opt = request.buildEndpoint(auth, "GET", '?a= a&b= b&where={"$gte":{"ciao":4}}', null)
assert.equal(opt.hostname, "a.stamplayapp.com")
assert.equal(opt.auth, "a:b")
assert.equal(opt.method, "GET")

var opt = request.buildEndpoint(auth, "DELETE", '?a= a&b= b&where={"$gte":{"ciao":4}}', null)
assert.equal(opt.hostname, "a.stamplayapp.com")
assert.equal(opt.auth, "a:b")
assert.equal(opt.method, "DELETE")
