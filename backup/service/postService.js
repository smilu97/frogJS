exp = module.exports

exp.getList = function(dbc, from, to, afterFunction) {
	var query = dbc.query('select board_no, title from test_board where visible=1 limit '+from+', '+to,
	function(err, rows) {
		afterFunction(err, rows)
	})
}

exp.getItem = function(dbc, board_no, afterFunction) {
	var query = dbc.query('select * from test_board where board_no='+board_no,
		function(err, result) {
			afterFunction(err, result)
		})
}
exp.deleteItem = function(dbc, board_no, afterFunction) {
	var query = dbc.query('delete from test_board where board_no='+board_no,
		function(err, result) {
			afterFunction(err, result)
		})
}
exp.createItem = function(dbc, post, afterFunction) {
	queryString = "INSERT INTO test_board"+
		" (title, contents, user_id, register_date, modify_date, visible)"+
		" VALUES ('"+
		post.title+"', '"+
		post.contents+"', '"+
		post.user_id+"', now(), now(), 1)"
	var query = dbc.query(queryString, function(err, result) { afterFunction(err, result) })
}
exp.modifyItem = function(dbc, post, afterFunction) {
	queryString = "UPDATE test_board SET title='"+post.title
	+"', contents='"+post.contents+"' WHERE board_no='"+post.board_no+"'"
	query = dbc.query(queryString, function(err, result) { afterFunction(err, result) })
}