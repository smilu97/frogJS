module.exports = function() {
	this.columns = ['no','filepath','status']
	this.table_name = 'file'
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
	this.latestNo = function(dbc, afterFunction) {
		var query = dbc.query('select max(no) as maxno from file', function(err, result) {
			afterFunction(err, result)
		})
	}
}