var request = require('./request')

function Query(auth) {

	function _createGeoQuery(queryOperator, shapeOperator, type, coordinates, maxDistance, minDistance) {
		var obj ={_geolocation:{}}
		obj._geolocation[queryOperator] = {};
		obj._geolocation[queryOperator][shapeOperator] = {type:type, coordinates:coordinates}
		if(maxDistance){
			obj._geolocation[queryOperator].$maxDistance = maxDistance
		}
		if(minDistance){
			obj._geolocation[queryOperator].$minDistance = minDistance	
		}
		return obj;
	}
	
	function _createGeoWithinQuery(shapeOperator, coordinates){
		var obj = {_geolocation:{$geoWithin:{}}}
		obj._geolocation.$geoWithin[shapeOperator] = coordinates
		return obj;
	}

	return function(model, instance){
		if(model && (model === 'user' || model === 'object')){
			return{
				model : model,
				instance : instance,
				paginationQuery : '',
				sortQuery:'',
				selectionQuery:'',
				populateQuery: '',
				populateOwnerQuery:'',
				whereQuery : [],
				executable : '',
				or : function(){
					var obj = { $or : []}
					if (arguments[0] instanceof Array) {
						arguments = arguments[0]
					}
					for(arg in arguments){
						if(arguments[arg].whereQuery)	
							obj.$or.push(arguments[arg].whereQuery[0])
						else
							throw new Error('Or function take only Query object')
					}
					this.whereQuery.push(obj)
					return this
				},
				pagination : function(page, per_page){
					this.paginationQuery = '&page='+page+'&per_page='+per_page
					return this
				},
				between : function(attr, value1, value2){
					var obj = {}
					obj[attr] = {"$gte":value1, "$lte":value2}
					this.whereQuery.push(obj)
					return this
				},
				greaterThan : function(attr, value){
					var obj = {}
					obj[attr] = {"$gt":value}
					this.whereQuery.push(obj)
					return this
				},	
				greaterThanOrEqual : function(attr, value){
					var obj = {}
					obj[attr] = {"$gte":value}
					this.whereQuery.push(obj)
					return this
				},
				lessThan : function(attr, value){
					var obj = {}
					obj[attr] = {"$lt":value}
					this.whereQuery.push(obj)
					return this
				},	
				lessThanOrEqual : function(attr, value){
					var obj = {}
					obj[attr] = {"$lte":value}
					this.whereQuery.push(obj)
					return this
				},
				equalTo : function(attr, value){
					var obj = {}
					obj[attr] = value
					this.whereQuery.push(obj)
					return this
				},
				sortAscending : function(value){
					this.sortQuery ='&sort='+value
					return this;
				},

				sortDescending : function(value){
					this.sortQuery ='&sort=-'+value
					return this
				},
				exists : function(attr){
					var obj = {}
					obj[attr] = {"$exists":true}
					this.whereQuery.push(obj)
					return this
				},
				notExists : function(attr){
					var obj = {}
					obj[attr] = {"$exists":false}
					this.whereQuery.push(obj)
					return this
				},
				regex: function(attr, regex, options){
					var obj = {};
					obj[attr] = {"$regex":regex, "$options": options};
					this.whereQuery.push(obj);
					return this;
				},

				populate: function(){
					this.populateQuery ='&populate=true'
					return this
				},
				
				populateOwner: function(){
					this.populateOwnerQuery ='&populate_owner=true'
					return this
				},

				select: function(){
					this.selectionQuery =  '&select='+ Array.prototype.slice.call(arguments).join(", ").replace(" ",'')
					return this
				},

				near: function(type, coordinates, maxDistance, minDistance){
				var obj = _createGeoQuery("$near", "$geometry", type, coordinates, maxDistance, minDistance)
				this.whereQuery.push(obj);
				return this;
				},

				nearSphere: function(type, coordinates, maxDistance, minDistance){
					var obj = _createGeoQuery("$nearSphere", "$geometry", type, coordinates, maxDistance, minDistance)
					this.whereQuery.push(obj);
					return this;
				},

				geoIntersects: function(type, coordinates){
					var obj = _createGeoQuery("$geoIntersects", "$geometry", type, coordinates)
					this.whereQuery.push(obj);
					return this;
				},

				geoWithinGeometry:function( type, coordinates){
					var obj = _createGeoQuery("$geoWithin", "$geometry", type, coordinates)
					this.whereQuery.push(obj);
					return this;
				},

				geoWithinCenterSphere: function(coordinates, radius){
					var finalParam = [coordinates, radius]
					var obj = _createGeoWithinQuery('$centerSphere',finalParam)
					this.whereQuery.push(obj);
					return this;
				},

				exec : function(callback){
					for(key in this.whereQuery){	
						var partial = JSON.stringify(this.whereQuery[key])
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
					var path = '/api/' + this.model + '/' + auth.version + '/' + this.instance 
										+'?where={'+this.executable+'}' + this.paginationQuery + this.selectionQuery 
										+ this.sortQuery + this.populateQuery + this.populateOwnerQuery
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