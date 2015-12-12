module.exports = function() {
	var bcrypt = require('bcrypt');
	var userSerivce = require('../services/user-service');
	var passport = require('passport');
	var passportLocal = require('passport-local');
	
	passport.use(new passportLocal.Strategy({ usernameField: 'email' }, function(email, password, next) {
		userSerivce.findUser(email, function(err, user) {
			if(err) { return next(err); }
			if(!user) { return next(null, null); }
			bcrypt.compare(password, user.password, function(err, same) {
				if(err) { return next(err); }
				if(!same) { return next(null, null); }
				next(null, user);
			});
		});
	}));
	
	passport.serializeUser(function(user, next) {
		next(null, user.email);
	});
	
	passport.deserializeUser(function(email, next) {
		userSerivce.findUser(email, function(err, user) {
			next(err, user);
		});
	});
};