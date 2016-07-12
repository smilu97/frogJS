module.exports = function(app, fs, dbc) {
	var postService = new require('../service/postService')
	var postModel = new require('../model/postModel')
	var userService = new require('../service/userService')
	app.post('/api/signup', function(req, res) {
		var user = {username : req.body.username, password : req.body.password}
		userService.createItem(dbc, user, function(err, result) {
			res.redirect('/')
		})
	})
	app.get('/page/signup', function(req, res) {
		res.render('signup')
	})
	app.get('/api/signin', function(req, res) {
		var user = {username : req.query.username, password : req.query.password}
		userService.getItemHasPassword(dbc, user, function(err, result) {
			if(result.length == 1) {
				sess = req.session
				sess.username = user.username
				res.redirect('/')
			}
			else {
				res.redirect('/page/signin')
			}
		})
	})
	app.get('/page/signin', function(req, res) {
		res.render('signin')
	})
	app.get('/api/logout', function(req, res) {
		req.session.destroy()
		res.redirect('/')
	})
}