// session.userinfo 에 들어갈 것들
InSessionUserInfo = {no:1, email:1, show_name:1, real_name:1, birth_date:1}
// '/page/user' 에서 보여줄 것들
UserInfoPageShow = {sex:1, created_date:1, last_date:1, image:1}

module.exports = function(app, fs, dbc, imp) {
	var userService = new (require('../service/userService'))()
	var fileService = new (require('../service/fileService'))()

	app.post('/api/signup', function(req, res) {
		var file;
		var filename;
		var cont = {}
		req.busboy.on('file', function(_fieldname, _file, _filename, _mimetype) {
			file = _file
			filename = _filename
		})
		req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
			cont[key] = value;
			if(key == 'sex') {
				var base64FileName = new Buffer(cont.email).toString('base64')
				var user = {email : cont.email, password : cont.password,
				real_name : cont.real_name, show_name : cont.show_name,
				sex:cont.sex, birth_date:cont.birth_date}
				userService.getItem(dbc, {no:1}, {email:cont.email}, function(err, result) {
					console.log(result)
					if(result != null) {
						if(result.length == 0) {
							filepath = 'public/img/userimg/' + base64FileName
							fstream = fs.createWriteStream(filepath)
							file.pipe(fstream)
							fileService.createItem(dbc, {filepath:filepath, status:1}, function(err, result) {
								fileService.latestNo(dbc, function(err, result) {
									user.image = result[0].maxno
									user.status = 3;
									userService.createItem(dbc, user, function(err, result) {
										userService.getItem(dbc, {no:1}, {email:user.email, password:user.password}, function(err, result) {
											if(result.length == 1) {
												res.redirect('/api/signin?email='+user.email+'&password='+user.password)
											}
											else {
												res.redirect('/page/signup')
											}
										})
									})
								})
							})
							
						}
						else {
							res.redirect('/page/signup')
						}
					}
					else {
						res.redirect('/page/signup')
					}
				})
			}
		})
		req.pipe(req.busboy)
	})
	app.get('/page/signup', function(req, res) {
		res.render('join')
	})
	app.get('/api/signin', function(req, res) {
		var user = {email : req.query.email, password : req.query.password}
		var wanted = InSessionUserInfo
		userService.getItem(dbc, wanted, user, function(err, result) {
			if(result != null){
				if(result.length == 1) {
					sess = req.session
					us = result[0];
					sess.userinfo = us
					res.redirect('/')
				}
				else {
					res.redirect('/page/signin')
				}
			}
			else {
				res.redirect('/page/signin')
			}
		})
	})
	app.get('/page/signin', function(req, res) {
		res.render('login')
	})
	app.get('/page/signin_email', function(req, res) {
		res.render('login_email')
	})
	app.get('/api/logout', function(req, res) {
		req.session.destroy()
	})
	app.get('/page/user', function(req, res) {
		sess = req.session
		if(sess.userinfo != undefined) {
			userService.getItem(dbc, UserInfoPageShow,
				{no:sess.userinfo.no}, function(err, result) {
				if(result.length == 1) {
					us = result[0]
					if(us.sex == 1) {
						us.sex = '남자'
					}
					else {
						us.sex = '여자'
					}
					us.image_path = '/img/userimg/' + us.image_path + '.jpg'
					us.email = sess.userinfo.email
					us.real_name = sess.userinfo.real_name
					us.show_name = sess.userinfo.show_name
					us.birth_date = sess.userinfo.birth_date
					console.log(us)
					res.render('user', us)
				}
				else {
					res.redirect('/')
				}
			})
		}
		else {
			res.redirect('/')
		}
	})
	app.get('/page/modify/user', function(req, res) {
		sess = req.session
		if(sess.userno != undefined) {
			resdic = {no:sess.userno, email:sess.email, real_name:sess.real_name, 
				show_name:sess.show_name, birth_date:sess.birth_date}
			resdic.birth_date = resdic.birth_date.substring(0, 10)
			res.render('modify_user', resdic)
		}
		else {
			res.redirect('/')
		}
	})
	app.post('/api/modify/user', function(req, res) {
		sess = req.session
		if(sess.userno != undefined) {
			us = {email:req.body.email, real_name:req.body.real_name, 
				show_name:req.body.show_name, birth_date:req.body.birth_date}
			userService.modifyItem(dbc, us, {no:sess.userno}, function(err, result) {
				res.redirect('/')
			})
		}
		else {
			res.redirect('/')
		}
	})
	app.get('/page/modify/user/image', function(req, res) {
		sess = req.session
		if(sess.userno != undefined) {
			res.render('modify_user_image')
		}
		else {
			res.redirect('/')
		}
	})
	app.post('/api/modify/user/image', function(req, res) {
		sess = req.session
		if(sess.userno != undefined) {
			var filePath = new Buffer(sess.email).toString('base64')
			req.busboy.on('file', function(fieldname, file, filename, mimetype) {
				fstream = fs.createWriteStream('public/img/userimg/' + filePath + '.jpg')
				file.pipe(fstream)
			})
			req.pipe(req.busboy)
			res.redirect('/')
		}
		else {
			res.redirect('/')
		}
	})
	app.get('/page/modify/user/password', function(req, res) {
		sess = req.session
		if(sess.userno != undefined) {
			res.render('modify_user_password')
		}
		else {
			res.redirect('/')
		}
	})
	app.post('/api/modify/user/password', function(req, res) {
		sess = req.session
		if(sess.userno != undefined) {
			pasw = req.body.password
			userService.modifyItem(dbc, {password:pasw}, {no:sess.userno}, function(err, result) {
				res.redirect('/')
			})
		}
		else {
			res.redirect('/')
		}
	})
}