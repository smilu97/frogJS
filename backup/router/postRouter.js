module.exports = function(app, fs, dbc) {
	var postService = new require('../service/postService')
	var postModel = new require('../model/postModel')
	var userService = new require('../service/userService')
	var page_postlist_msg = ''
	app.get('/page/postlist', function(req, res) {
		postService.getList(dbc, 0, 10, function(err, rows) {
			resJson = {}
			resJson.title = 'postLists'
			resJson.posts = rows
			resJson.msg = page_postlist_msg
			res.render('postlist', resJson)
			if(page_postlist_msg != '') {
				page_postlist_msg = ''
			}
		})
	})
	app.get('/page/postcontent', function(req, res) {
		board_no = req.query.board_no
		if(board_no == undefined) {
			res.redirect('/page/postlist')
		}
		postService.getItem(dbc, board_no, function(err, result) {
			sess = req.session
			if(result.length == 0) {
				res.redirect('/page/postlist')
			}
			else {
				post = result[0]
				post.owner = 0
				if(post.user_id == sess.username) {
					post.owner = 1
				}
				res.render('postcontent',post)
			}
		})
	})
	app.get('/api/delete/post', function(req, res) {
		board_no = req.query.board_no
		if(board_no == undefined) {
			res.redirect('/page/postlist')
		}
		postService.deleteItem(dbc, board_no, function(err, result) {
			res.redirect('/page/postlist')
		})
	})
	app.post('/api/create/post', function(req, res) {
		sess = req.session
		if(sess.username == undefined) {
			redirect('/page/postlist')
		}
		else {
			req.body.user_id = sess.username
			postService.createItem(dbc, req.body, function(err, result) {
				res.redirect('/page/postlist')
			})
		}
	})
	app.get('/page/create/post', function(req, res) {
		sess = req.session
		if(sess.username == undefined) {
			page_postlist_msg = 'Please login to post'
			res.redirect('/page/postlist')
		}
		else {
			res.render('postpage')
		}
	})
	app.get('/page/modify/post', function(req, res) {
		sess = req.session
		if(sess.username == undefined) {
			page_postlist_msg = 'Please login to modify post'
			res.redirect('/page/postlist')
		}
		resJson = {}
		resJson.board_no = req.query.board_no
		res.render('postmodify', resJson)
	})
	app.post('/api/modify/post', function(req, res) {
		sess = req.session
		if(sess.username == undefined) {
			redirect('/page/postlist')
		}
		else {
			postService.modifyItem(dbc, req.body, function(err, result) {
				res.redirect('/page/postcontent?board_no='+req.body.board_no)
			})
		}
	})
}