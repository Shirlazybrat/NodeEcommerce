var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Accounts = new Schema ({
	username: {type: String, required: true, trim: true},
	password: {type: String, required: true},
	email: {type: String, required: true}
	});

module.exports = mongoose.model('Accounts', Accounts);