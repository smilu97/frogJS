module.exports = function(app, fs, dbc) {
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
}