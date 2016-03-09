var stamplayObject = require('./object')
	, stamplayUser = require('./user')
	, stamplayWebhook = require('./webhook')
	, stamplayQuery = require('./query')
	, StamplayCodeblock = require('./codeblock')
	, StamplayStripe = require('./stripe')


function Stamplay(appId, apiKey, version) {
	if(appId && apiKey){
		this.appId = appId	
		this.apiKey = apiKey
		this.version = version || 'v1'
		var auth = {
			appId: this.appId,
			apiKey: this.apiKey,
			version: this.version
		}
		this.Object = stamplayObject(auth)
		this.User = stamplayUser(auth)
		this.Webhook = stamplayWebhook(auth)
		this.Query = stamplayQuery(auth)
		this.Codeblock = StamplayCodeblock(auth)
		this.Stripe = StamplayStripe(auth)
	}else{
		throw new Error('Missing appId or apiKey')
	}
}

module.exports = Stamplay