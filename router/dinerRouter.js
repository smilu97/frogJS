module.exports = function(app, fs, dbc, imp) {
	var dinerService = new (require('../service/dinerService'))()
	app.get('/page/detail', function(req, res) {
		diner_no = req.query.no
		sess = req.session
		dinerService.getItem(dbc, {no:1,diner_name:1,diner_call:1,intro:1,posting_date:1},{no:diner_no}, function(err, result) {
			if(result != null) {
				if(result.length == 1) {
					diner = result[0]
					diner.show_name = ''
					if(sess.show_name != null) {
						diner.show_name = sess.show_name
					}
					res.render('detail', diner)
				}
				else {
					res.redirect('/')
				}
			}
			else {
				res.redirect('/')
			}
		})
	})
	app.get('/test/page/buytest', function(req, res) {
		res.render('buyTest')
	})
	app.get('/api/prepare/', function(req, res) {
		merchantId = req.query.merchantId
		amount = req.query.amount
		imp.payment.prepare({merchant_uid : merchantId,
			'amount':amount}).then(function(result) {
				res.send(result)
			})
	})
	app.get('/page/create/diner', function(req, res) {
		var sess = req.session;
		if(sess.userinfo != undefined) {
			res.render('createDiner')
		}
		else {
			res.redirect('/')
		}
	})
	app.post('/api/create/diner', function(req, res) {
		var sess = req.session;
		if(sess.userinfo != undefined) {
			var t_diner = {
				diner_name : req.body.diner_name,
				owner : sess.userinfo.no,
				diner_call : req.body.diner_call,
				intro : req.body.intro,
				rest_dat : req.body.rest_dat,
				posting_date : req.body.posting_date,
				road_address : req.body.road_address,
				post_address : req.body.post_address,
				latitude : req.body.latitude,
				longitude : req.body.longitude,
				photos:''
			}
			dinerService.createItem(dbc, t_diner, function(dc_err, dc_result){
				res.redirect('/')
			})
		}
		else {
			res.redirect('/')
		}
	})
}