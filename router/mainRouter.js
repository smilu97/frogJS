module.exports = function(app, fs, dbc) {
	app.get('/', function(req, res) {
		sess = req.session
		resJson = {}
		resJson.title = 'Test JSON Title'
		resJson.username = ''
		if(sess.username != null) {
			resJson.username = sess.username
		}
		res.render('index', resJson)
	})
}