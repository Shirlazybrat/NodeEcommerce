var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema ({
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	token: String,
	tokenExpDate: Date, // currently not in use
	name: String,
	home: String,
	deliver: Number,
	address: String,
	city: String,
	zip: Number,
	phone: Number,
	details: String,
	orders: {
		Item: String,
		Amount: Number,
		Total: Number
		}
	});

module.exports = mongoose.model('Account', Account);

 // Use node mailer to outomate the orders to her email- https://nodemailer.com/