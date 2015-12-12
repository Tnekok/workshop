var express = require('express');
var restrict = require('../auth/restrict');
var router = express.Router();


router.get('/', restrict, function(req, res, next) {
	var vm = {
		title: 'Name it whatever you want',
		somethingId: req.session.somethingId,	/* added as a variable for the view model in internal/index.hbs */
		firstName: req.user ? req.user.firstName : null
	};
	res.render('internal/index', vm);
});

module.exports = router;
