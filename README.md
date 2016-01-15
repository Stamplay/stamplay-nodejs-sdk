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

# One more thing
Go to [API Reference](https://stamplay.com) and ENJOY!.
<img align="right" src="https://editor.stamplay.com/img/logo-robot-no-neck.png" height=60>

