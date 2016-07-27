module.exports = function() {
	this.columns = ['no','real_name','show_name','email','password','sex','birth_date','created_date',
	'last_date','image','status']
	this.table_name = 'user'
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