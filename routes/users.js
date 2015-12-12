var express = require('express');
var passport = require('passport');
var config = require('../config');
var userService = require('../services/user-service');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


router.get('/create', function(req, res, next) {
	var vm = {
		title: 'Create an Account'
	};
	res.render('users/create', vm);
});


router.post('/create', function(req, res, next) {
	userService.addUser(req.body, function(err) {
		if(err) {
			console.log(err);
			var vm = {
				title: 'Create an Account',
				input: req.body,
				error: err
			};
			delete vm.input.password;
			return res.render('users/create', vm);
		}
		req.login(req.body, function(err) {
			res.redirect('/internal');
		});
	});
});


router.post('/login', 
	function(req, res, next) {
		req.session.somethingId = 12345;	/* test to place the ids (further dev for interaction with db) --> land on routes/internal.js */
		if(req.body.rememberMe) {
			req.session.cookie.maxAge = config.cookieMaxAge;
		}
		next();
	}, 
	passport.authenticate('local', { 
		failureRedirect: '/', 
		successRedirect: '/internal',
		failureFlash: 'Invalid Credentials' 
	})
);


router.get('/logout', function(req, res, next) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
