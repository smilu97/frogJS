module.exports = function() {
	this.columns = ['no','diner_name','diner_call','intro','rest_day','posting_date','road_address',
	'post_address','latitude','longitude','photos']
	this.table_name = 'diner'
	base = new (require('./base'))()
	this.getItem = function(dbc, wanted, item, afterFunction) {
		base.getItem(dbc, wanted, item, afterFunction, this.columns, this.table_name)
	}
	this.createItem = function(dbc, item, afterFunction) {
		base.createItem(dbc, item, afterFunction, this.columns, this.table_name)
	}
	this.modifyItem = function(dbc, modified, where, afterFunction) {
		base.modifyItem(dbc, modified, where, afterFunction, this.columns, this.table_name)
	}
}