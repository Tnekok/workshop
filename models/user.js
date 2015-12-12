var mongoose = require('mongoose');
var userService = require('../services/user-service');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: { type: String, required: 'Please enter your First Name' },
	lastName: { type: String, required: 'Please enter your Last Name' },
	age: { type: Number, required: 'Please enter your Age', min:[1, 'Not a valid value'] },
	email: { type: String, required: 'Please enter your Email' },
	password: { type: String, required: 'Please enter your Password' },
	created: { type: String, default: Date.now }
});

userSchema.path('email').validate(function(value, next) {
	userService.findUser(value, function(err, user) {
		if(err) {
			console.log(err);
			return next(false);
		}
		next(!user);
	});
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = { User: User };