module.exports = function() {
	this.getItem = function(dbc, wanted, item, afterFunction, columns, table_name) {
		var queryString = "select "
		check = false
		for(var colIndex=0;colIndex<columns.length;colIndex++) {
			col = columns[colIndex]
			if(wanted[col] == 1) {
				check = true
				queryString += col+','
			}
		}
		if(!check) {
			console.log("user getitem no wanted");
			console.log(wanted)
			console.log(item)
			return;
		}
		queryString = queryString.substring(0,queryString.length-1)
		queryString += " from "+table_name+" where "
		isCondition = false
		for(var colIndex=0;colIndex<columns.length;colIndex++) {
			col = columns[colIndex]
			if(item[col] != undefined) {
				isCondition = true
				queryString += col+"="+dbc.escape(item[col])+" and "
			}
		}
		if(isCondition) {
			queryString = queryString.substring(0, queryString.length-4)
		}
		else {
			queryString = queryString.substring(0, queryString.length-6)
		}
		var query = dbc.query(queryString, function(err, result) {
			console.log('getItem : ' + queryString)
			afterFunction(err, result)
		})
	}

	this.createItem = function(dbc, item, afterFunction, columns, table_name) {
		var queryString = "insert into "+table_name+"("
		check = false
		for(var colIndex=0;colIndex<columns.length;colIndex++) {
			col = columns[colIndex]
			if(item[col] != undefined) {
				check = true
				queryString += col+','
			}
		}
		if(!check) {
			console.log('createItem 1 error!')
			return
		}
		queryString = queryString.substring(0, queryString.length-1)
		queryString += ") values ("
		for(var colIndex=0;colIndex<columns.length;colIndex++) {
			col = columns[colIndex]
			if(item[col] != undefined) {
				queryString += dbc.escape(item[col])+","
			}
		}
		queryString = queryString.substring(0,queryString.length-1)
		queryString += ')'
		var query = dbc.query(queryString, function(err, result) {
			console.log('createItem : ' + queryString)
			afterFunction(err, result)
		})
	}

	this.modifyItem = function(dbc, modified, where, afterFunction, columns, table_name) {
		var queryString = "update " + table_name + " SET "
		if(Object.keys(modified).length == 0) {
			console.log('nothing to modify')
			return;
		}
		for (key in modified) {
			queryString += key+'='+dbc.escape(modified[key])+', '
		}
		queryString = queryString.substring(0, queryString.length-2)
		queryString += ' where '
		if(Object.keys(where).length == 0) {
			console.log('there is no modify condition')
			return;
		}
		for (key in where) {
			queryString += key+'='+dbc.escape(where[key])+' and '
		}
		queryString = queryString.substring(0, queryString.length-4)
		console.log(queryString)
		var query = dbc.query(queryString, function(err, result) {
			console.log('modifyItem : ' + queryString)
			afterFunction(err, result)
		})
	}

	this.deleteItem = function(dbc, where, afterFunction, columns, table_name) {
		
	}
}
//UPDATE `frog`.`users` SET `show_name`='imgod2', `email`='admin2@gmail.com' WHERE `no`='27';