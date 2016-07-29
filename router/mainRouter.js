module.exports = function(app, fs, dbc, imp) {
	area_array = ['인천', '서울', '부산']
	var fileService = new (require('../service/fileService'))()
	app.get('/', function(req, res) {
		area = req.cookies.area
		areaSuccess = false
		if(area != undefined) {
			for(areaIndex in area_array) {
				if(area_array[areaIndex] == area) {
					areaSuccess = true
					res.redirect('/page/main?area='+area)
					break
				}
			}
		}
		if(!areaSuccess) {
			sess = req.session
			resJson = {}
			resJson.title = 'Test JSON Title'
			resJson.show_name = ''
			if(sess.userinfo != null) {
				resJson.show_name = sess.userinfo.show_name
			}
			res.render('index', resJson)
		}
	})
	app.get('/page/main', function(req, res) {
		area = req.query.area
		for(areaIndex in area_array) {
			if(area_array[areaIndex] == area) {
				sess = req.session
				res.cookie('area', area)
				resJson = {'area' : area}
				resJson.show_name = ''
				if(sess.userinfo != null) {
					resJson.show_name = sess.userinfo.show_name
				}
				res.render('main', resJson)
				break;
			}
		}
	})
	app.get('/img/:imgno', function(req, res) {
		imgno = req.params.imgno
		fileService.getItem(dbc, {filepath:1}, {no:imgno}, function(err, result) {
			if(result != null) {
				if(result.length > 0) {
					filepath = result[0].filepath
					var img = fs.readFileSync(filepath);
					res.contentType('image/jpeg');
    				res.end(img, 'binary');
				}	
				else {
					res.send('')
				}
			}
			else {
				res.send('')
			}
		})
	})
}