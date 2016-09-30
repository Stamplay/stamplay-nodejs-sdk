<img src="https://editor.stamplay.com/img/logo-robot-no-neck.png" align="left" width="170px" height="160px"/>
<img align="left" width="0" height="160px" hspace="10"/>

> #Stamplay NodeJS SDK
[![npm version](https://badge.fury.io/js/stamplay.svg)](https://badge.fury.io/js/stamplay)
[![Build Status](https://travis-ci.org/Stamplay/stamplay-nodejs-sdk.svg?branch=master)](https://travis-ci.org/Stamplay/stamplay-nodejs-sdk)
[![No dependecies](http://img.shields.io/badge/dependecies-0-blue.svg)](https://stamplay.com)
[![Code Climate](https://codeclimate.com/github/Stamplay/stamplay-nodejs-sdk/badges/gpa.svg)](https://codeclimate.com/github/Stamplay/stamplay-nodejs-sdk)

This library  gives you access to the powerful Stamplay cloud platform from your Node app. For more info on Stamplay and its features, see the <a href="https://stamplay.com">website</a>
<br>
<br>

##Getting Started
This module is available for download on NPM:

```
npm install stamplay
```

To get started:
```javascript
var Stamplay = require('stamplay')
var stamplay = new Stamplay('appId', 'apiKey')
```

##How to use it
Register a new user:
```javascript
var data = {
	"email":"john@stamplay.com",
	"password":"john123"
}
stamplay.User.save(data, function(error, result){
	//manage the result and the error
})
```
Store data using Objects:
```javascript
var data = {
	"description":"A description",
	"title":"New title"
}
stamplay.Object('foo').save(data, function(error, result){
	//manage the result and the error
})
```

Executing code with Code Block:
```javascript
var codeblock = new stamplay.Codeblock('codeBlockId');
var data = { foo: 'bar' }; // request body

var query = {
  q1 : 1,
  q2 : 'query parameter'
};

codeblock.run(data, query, function (err, res) {
  if(err) return err;
  // Handle Success
})
```

##Available components
This NodeJS SDK expose the following components:

* [User](https://stamplay.com/docs/nodejs-sdk/reference#api-ref-user)
	* <code>save(data, [callback])</code>
  * <code>get(data, [callback])</code>
  * <code>remove(id, [callback])</code>
  * <code>update(id, data, [callback] )</code>
  * <code>getRoles([callback] )</code>
  * <code>getRole(roleId, [callback] )</code>
  * <code>setRole(id, roleId, [callback] )</code>
* [Object](https://stamplay.com/docs/nodejs-sdk/reference#api-ref-code-objects)
	* <code>save(data, [callback])</code>
	* <code>get(data, [callback])</code>
	* <code>remove(id, [callback])</code>
	* <code>update(id, data, [callback])</code>
	* <code>patch(id, data, [callback])</code>
	* <code>upVote(id, [callback])</code>
	* <code>downVote(id, [callback])</code>
	* <code>rate(id, rate, [callback])</code>
	* <code>comment(id, text, [callback])</code>
	* <code>push(id, attribute, data, [callback])</code>
* [Code Block](https://stamplay.com/docs/nodejs-sdk/reference#api-ref-code-block)
	* <code>post(data, queryParams, [callback])</code>
	* <code>put(data, queryParams, [callback])</code>
	* <code>patch(data, queryParams, [callback])</code>
	* <code>get(queryParams, [callback])</code>
	* <code>delete(queryParams, [callback])</code>
* [Webhook](https://stamplay.com/docs/nodejs-sdk/reference#api-ref-webhook)
	* <code>post(data, [callback])</code>
* [Stripe](https://stamplay.com/docs/nodejs-sdk/reference#api-ref-stripe)
	* <code>deleteCustomer(userId, [callback])</code>
	* <code>createSubscription(userId, planId, [callback])</code>
	* <code>deleteSubscription(userId, subscriptionId, options, [callback])</code>
	* <code>getSubscription(userId, subscriptionId, [callback])</code>
	* <code>getSubscriptions(userId, options, [callback])</code>
	* <code>updateSubscription(userId, subscriptionId, options, [callback])</code>
* [Query](https://stamplay.com/docs/nodejs-sdk/reference#api-ref-query)
	* <code>greaterThan(attr, value)</code>
	* <code>greaterThanOrEqual(attr, value)</code>
	* <code>lessThan(attr, value)</code>
	* <code>lessThanOrEqual(attr, value)</code>
	* <code>pagination(page, per_page)</code>
	* <code>between(attr, value1, value2)</code>
	* <code>equalTo(attr, value)</code>
	* <code>exists(attr)</code>
	* <code>notExists(attr)</code>
	* <code>sortAscending(attr)</code>
	* <code>sortDescending(attr)</code>
	* <code>populate()</code>
	* <code>populateOwner()</code>
	* <code>select(attr,...)</code>
	* <code>regex(attr, regex, options)</code>
	* <code>near(type, coordinates, maxDistance, minDistance)</code>
	* <code>nearSphere(type, coordinates, maxDistance, minDistance)</code>
	* <code>geoIntersects(type, coordinates)</code>
	* <code>geoWithinGeometry(type, coordinates)</code>
	* <code>geoWithinCenterSphere(coordinates, radius)</code>
	* <code>or(query,..)</code>
	* <code>exec([callback])</code>

-------------------------------------------------------


## Contributing

1. Fork it ( https://github.com/[my-github-username]/stamplay-nodejs-sdk/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## One more thing
Go to [Stamplay](https://editor.stamplay.com/login) and try it now for free!.
<img align="right" src="https://editor.stamplay.com/img/logo-robot-no-neck.png" height=60>
