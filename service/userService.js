exp = module.exports

exp.getItem = function(dbc, username, afterFunction) {
	var query = dbc.query('select * from users where username='+username,
		function(err, result) {
			afterFunction(err, result)
		})
}

exp.createItem = function(dbc, user, afterFunction) {
	var queryString = "INSERT INTO users(username, password, enabled) VALUES ('" +
		user.username + "', '" + user.password + "', '1')"
	var query = dbc.query(queryString, function(err, result) { afterFunction(err, result) })
}

exp.getItemHasPassword = function(dbc, user, afterFunction) {
	var queryString = "select * from users where username='"+user.username+"' and password='"+user.password+"'"
	var query = dbc.query(queryString, function(err, result) { 
		afterFunction(err, result) 
	})
}
