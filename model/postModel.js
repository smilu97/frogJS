exp = module.exports

exp.check = function(dat) {
	if(dat.board_no == undefined) {
		return false
	}
	if(dat.title == undefined) {
		return false
	}
	if(dat.contents == undefined) {
		return false
	}
	if(dat.user_id == undefined) {
		return false
	}
	if(dat.register_date == undefined) {
		return false
	}
	if(dat.modify_date == undefined) {
		return false
	}
	if(dat.visible == undefined) {
		return false
	}
}
