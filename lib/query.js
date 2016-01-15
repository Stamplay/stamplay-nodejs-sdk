var request = require('./request')

function Query(auth) {
	return function(model, instance){
		if(model && (model === 'user' || model === 'object')){
			return{
				model : model,
				instance : instance,
				paginationQuery : '',
				currentQuery : [],
				executable : '',
				or : function(){
					var obj = { $or : []}
					if (arguments[0] instanceof Array) {
						arguments = arguments[0]
					}
					for(arg in arguments){
						if(arguments[arg].currentQuery)	
							obj.$or.push(arguments[arg].currentQuery[0])
						else
							throw new Error('Or function take only Query object')
					}
					this.currentQuery.push(obj)
					return this
				},
				pagination : function(page, per_page){
					this.paginationQuery = '&page='+page+'&per_page='+per_page
					return this
				},
				between : function(attr, value1, value2){
					var obj = {}
					obj[attr] = {"$gte":value1, "$lte":value2}
					this.currentQuery.push(obj)
					return this
				},
				greaterThan : function(attr, value){
					var obj = {}
					obj[attr] = {"$gt":value}
					this.currentQuery.push(obj)
					return this
				},	
				greaterThanOrEqual : function(attr, value){
					var obj = {}
					obj[attr] = {"$gte":value}
					this.currentQuery.push(obj)
					return this
				},
				lessThan : function(attr, value){
					var obj = {}
					obj[attr] = {"$lt":value}
					this.currentQuery.push(obj)
					return this
				},	
				lessThanOrEqual : function(attr, value){
					var obj = {}
					obj[attr] = {"$lte":value}
					this.currentQuery.push(obj)
					return this
				},
				equalTo : function(attr, value){
					var obj = {}
					obj[attr] = value
					this.currentQuery.push(obj)
					return this
				},
				sortAscending : function(value){
					var obj = {
						$sort: {}
					}
					obj.$sort[value] = 1
					this.currentQuery.push(obj)
					return this
				},
				sortDescending : function(value){
					var obj = {
						$sort: {}
					}
					obj.$sort[value] = -1
					this.currentQuery.push(obj)
					return this
				},
				exists : function(attr){
					var obj = {}
					obj[attr] = {"$exists":true}
					this.currentQuery.push(obj)
					return this
				},
				notExists : function(attr){
					var obj = {}
					obj[attr] = {"$exists":false}
					this.currentQuery.push(obj)
					return this
				},
				exec : function(callback){
					for(key in this.currentQuery){	
						var partial = JSON.stringify(this.currentQuery[key])
						partial = partial.substring(1, partial.length-1)
						this.executable += (key==0) ? partial : ','+partial
					}
					switch(this.model){
						case 'object':
							this.model = 'cobject'
						break
						case 'user':
							this.instance = 'users'
						break
					}
					var path ='/api/' + this.model + '/' + auth.version + '/' + this.instance +'?where={'+this.executable+'}'+ this.paginationQuery
					var options = request.buildEndpoint(auth, 'GET', path, false)
					request.make(options, callback)
				}
			}
		}else{
			throw new Error('Stamplay.Query() needs a component name (object or user)')
		}
	}
}

module.exports = Query